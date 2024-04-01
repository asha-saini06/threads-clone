import { Flex, Avatar, Text, Image, Box, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/Yuta Okkotsu.png" name="Yuta Okkotsu" size={"md"} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              yutaokkotsu
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}> I just made this thread!</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid "}
        borderColor={"gray.light"}
      >
        <Image
          src={
            "https://i.pinimg.com/736x/d2/a5/c6/d2a5c645b68c984d08f2ae844fb813c5.jpg"
          }
          w={"full"}
        />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          438 replies
        </Text>
        <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      <Comment
        comment="Looks great!"
        createdAt="2d"
        likes={1300}
        username="satarou"
        userAvatar="https://i.pinimg.com/736x/91/21/ce/9121ce0feaa129d203fa1334773eaa19.jpg"
      />
      <Comment
        comment="Not bad."
        createdAt="1d"
        likes={180}
        username="maki"
        userAvatar="/maki.jpg"
      />
      <Comment
        comment="You've got this!"
        createdAt="4d"
        likes={210}
        username="nanami"
        userAvatar="/nanami.jpg"
      />
    </>
  );
};

export default PostPage;
