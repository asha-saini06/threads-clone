import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  // this is the user whose profile is being viewed
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // get the current user from recoil state. i.e., logged in user
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  ); // check if the current user is following the user whose profile is being viewed
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);

  const copyURL = () => {
    const currentURL = window.location.href;
    // console.log(currentURL);
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Copied!",
        description: "Profile URL copied.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

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

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}> {user.username}</Text>
            <Text
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{ base: "md", md: "xl" }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{ base: "md", md: "xl" }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}

      {currentUser?._id !== user._id && (
        <Link as={RouterLink} to="/follow">
          <Button
            size={"sm"}
            onClick={handleFollowUnfollow}
            isLoading={updating} // show a loading spinner if the request is in progress
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        </Link>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}> {user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}> instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          pb={3}
          color={"gray.light"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
