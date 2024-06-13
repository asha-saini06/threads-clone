import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const showToast = useShowToast();

    useEffect(() => {
        const getUser = async () => { // get the user data from the server and set it in recoil state // run the getUser function whenever the username changes
            try {
                const res = await fetch(`/api/users/profile/${username}`); // send a GET request to the server
                const data = await res.json(); // get the response data
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                if (data.isFrozen) { // check if the user is frozen by the admin
                    setUser(null);
                    return;
                }
                setUser(data); // set user data in recoil state
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [username, showToast]);

    return { loading, user };
};

export default useGetUserProfile;