import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
  const { user, loading } = useGetUserProfile(); // get the user data from the hook and recoil state
  const { username } = useParams(); // get the username from the URL
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    // get the user's posts from the server and set them in recoil state
    const getPosts = async () => {
      if (!user) return; // if the user is not found, return
      setFetchingPosts(true); // set fetchingPosts state to true
      try {
        const res = await fetch(`/api/posts/user/${username}`); // send a GET request to the server
        const data = await res.json();
        // console.log(data);
        setPosts(data); // set user data in recoil state
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]); // clear the posts state
      } finally {
        setFetchingPosts(false); // set fetchingPosts state to false
      }
    };

    getPosts(); // call the getPosts function
  }, [username, showToast, setPosts, user]);
  // console.log("posts from recoil", posts);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
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
