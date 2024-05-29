import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

const useLogout = () => {
    const setUser = useRecoilState(userAtom);
    const showToast = useShowToast();

    const logout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }); // send logout request to server
            const data = await res.json(); // wait for response

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            localStorage.removeItem("user-threads"); // remove user data from local storage
            setUser(null); // clear user data in recoil state
        } catch (error) {
            showToast("Error", error, "error");
        }
    };
    return logout;
};

export default useLogout;