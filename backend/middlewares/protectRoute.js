import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; //get token from cookie

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET); //  verify token

        const user = await User.findById(verified.userId).select("-password"); // find user with id in token

        req.user = user; // add user to request

        next(); // pass control to next middleware
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in protectRoute: ", err.message);
    }
}

export default protectRoute;