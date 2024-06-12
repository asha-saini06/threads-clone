import express from "express";
import { followUnfollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser, getSuggestedUsers } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser); //Toggle state (follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);


export default router;
