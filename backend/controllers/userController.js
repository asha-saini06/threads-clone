import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";

// Get User Profile
const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password").select("-updatedAt");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
}

// Signup user
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res); //passing _id of newly created user

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    })

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in loginUser: ", err.message);
  }
}

// Logout User
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logoutUser: ", err.message);
  }
}

// Follow - Unfollow User
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // id of user to be followed/unfollowed
    const userToModify = await User.findById(id); // userToModify is the user to be followed/unfollowed
    const currentUser = await User.findById(req.user._id); // req.user is from protectRoute middleware

    if (id === req.user._id.toString()) return res.status(400).json({ error: "You cannot follow / unfollow yourself" });

    if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      // Modify current user following, modify followers of userToModify
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); // id of userToModify is passed
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); // id of currentUser is passed 
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow User
      // Add user to current user following, add current user to userToModify followers
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnfollowUser: ", err.message);
  }
}

// Update user
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body; // profilePic is passed as base64 encoded string
  const userId = req.user._id; // req.user is from protectRoute middleware

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.params.id !== userId.toString()) return res.status(403).json({ error: "You can't update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    }

    if (profilePic) { // if profilePic is passed
      if (user.profilePic) { // if profilePic is already stored in cloudinary
        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]); // deletes old profilePic from cloudinary

        // An example to show above expression works:
        // >  "https://res.cloudinary.com/dx2sb5fhx/image/upload/v1715771625/lwuifgmnu68dxikznwbj.jpg".split("/")
        // (8) ['https:', '', 'res.cloudinary.com', 'dx2sb5fhx', 'image', 'upload', 'v1715771625', 'lwuifgmnu68dxikznwbj.jpg']
        // >  "lwuifgmnu68dxikznwbj.jpg".split(".")
        // (2) ['lwuifgmnu68dxikznwbj', 'jpg']
        // >  "lwuifgmnu68dxikznwbj.jpg".split(".")[0]
        // 'lwuifgmnu68dxikznwbj' <- this is the image's public id (basically image name)
      }

      // Upload profile picture to cloudinary and store the response
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url; // profilePic is stored in cloudinary secure_url
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    // password should be null in response 
    user.password = null;

    res.status(200).json(user); // return updated user to the frontend (UpdateProfilePage.jsx)

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
}



export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile };
