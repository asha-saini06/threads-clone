import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const showToast = useShowToast();

    useEffect(() => {
        const getUser = async () => {   // run the getUser function whenever the username changes
            try {
                const res = await fetch(`/api/users/profile/${username}`); // send a GET request to the server
                const data = await res.json(); // wait for the response
                if (data.error) {
                    showToast("Error", data.error, "error");
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

    return { user, loading };
}

export default useGetUserProfile