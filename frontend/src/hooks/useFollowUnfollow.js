import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const useFollowUnfollow = (user) => {
    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id)); // check if the current user is following the user whose profile is being viewed
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast("Error", "Please login to follow", "error");
            return;
        }
        if (updating) return; // return if the request is already in progress

        setUpdating(true); // set updating state to true to prevent multiple requests

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }); // send a POST request to the server
            const data = await res.json(); // wait for the response
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            if (following) {
                showToast("Success", `Unfollowed ${user.name}`, "success");
                user.followers.pop(); // simulate remove the current user from the 'followers' array
            } else {
                showToast("Success", `Followed ${user.name}`, "success");
                user.followers.push(currentUser?._id); // simulate adding to 'followers (only on client-side) by pushing the current user's id
            }
            setFollowing(!following); // toggle the 'following' state

            console.log(data);
        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setUpdating(false); // set updating state to false once the request is complete or failed
        }
    };

    return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;