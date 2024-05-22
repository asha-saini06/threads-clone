import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams(); // get the username from the URL
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

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
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    const getPosts = async () => {
      if (!user) return; // if user is not found, return
      setFetchingPosts(true); // set fetchingPosts state to true
      try {
        const res = await fetch(`/api/posts/user/${username}`); // send a GET request to the server
        const data = await res.json();
        console.log(data);
        setPosts(data); // set user data in recoil state
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]); // clear the posts state
      } finally {
        setFetchingPosts(false); // set fetchingPosts state to false
      }
    };

    getUser(); // call the getUser function
    getPosts(); // call the getPosts function
  }, [username, showToast, setPosts]);

  if (!user && loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}

      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
