import { Flex, Avatar, Text, Divider } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {reply.username}
            </Text>
          </Flex>
          <Text fontSize={"sm"}>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
