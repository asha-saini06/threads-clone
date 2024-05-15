import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams(); // get the username from the URL
  const showToast = useShowToast();

  // run the getUser function whenever the username changes
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`); // send a GET request to the server
        const data = await res.json(); // wait for the response

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data); // set user data in recoil state
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser(); // call the getUser function
  }, [showToast, username]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1300}
        replies={100}
        postImg="https://i.pinimg.com/736x/d2/a5/c6/d2a5c645b68c984d08f2ae844fb813c5.jpg"
        postTitle=" I just made this thread!"
      />
      <UserPost
        likes={1560}
        replies={163}
        postTitle="the name Maki contains the kanji for ‘real, genuine’ (真 ma) and ‘hope’ (希 ki)"
      />
      <UserPost
        likes={390}
        replies={80}
        postImg="/nanami.jpg"
        postTitle="7:3"
      />
      <UserPost
        likes={9240}
        replies={1420}
        postImg="https://i.pinimg.com/736x/91/21/ce/9121ce0feaa129d203fa1334773eaa19.jpg"
        postTitle="Don't Worry, I'm The Strongest."
      />
    </>
  );
};

export default UserPage;
