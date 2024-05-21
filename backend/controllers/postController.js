import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

// Create Post
const createPost = async (req, res) => {

    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ error: "postedBy and text fields are required" })
        }

        const user = await User.findById(postedBy);
        if (!user) { return res.status(404).json({ error: "User not found" }) }

        // check if the user is the same as the logged in user
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create post" })
        }

        const maxLength = 1500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` })
        }

        if (img) {
            // Upload image to cloudinary and store the response
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url; // img is stored in cloudinary secure_url
        }

        const newPost = new Post({ postedBy, text, img });
        await newPost.save(); // save the new post

        res.status(201).json({ message: "Post created successfully", newPost }) // return the new post

    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err)
    }

}

// Get Posts
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}

// Delete a Post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // get the post from the database

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete this post" }); // check if the user is the same as the logged in user
        }

        await Post.findByIdAndDelete(req.params.id); // delete the post from the database

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Like or Unlike a Post
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params; // postId is the id of the post
        const userId = req.user._id; // req.user is from protectRoute middleware

        const post = await Post.findById(postId); // get the post from the database

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const userLikedPost = post.likes.includes(userId); // check if the user has already liked the post
        if (userLikedPost) {
            // Unlike post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }); // remove the userId from the likes array
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            // Like post
            post.likes.push(userId); // add the userId to the likes array
            await post.save(); // save the post to the database

            res.status(200).json({ message: "Post liked successfully" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Reply to a post
const replyToPost = async (req, res) => {
    try {
        const { text } = req.body; // text is the text of the reply
        const postId = req.params.id; // postId is the id of the post
        const userId = req.user._id; // req.user is from protectRoute middleware
        const userProfilePic = req.user.profilePic; // get the profilePic of the user
        const username = req.user.username; // get the username of the user

        if (!text) {
            return res.status(400).json({ error: "Text field is required" })
        }

        const post = await Post.findById(postId); // get the post from the database
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const reply = { userId, text, username, userProfilePic }

        post.replies.push(reply); // add the reply to the replies array
        await post.save(); // save the post to the database

        res.status(200).json({ message: "Reply posted successfully", post });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get Feed Posts
const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const following = user.following; // get the following array of the user

        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 }); // get the posts from the database where the postedBy is in the following array of the user and sort them by createdAt in descending order

        res.status(200).json(feedPosts); // return the posts to the frontend

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts }