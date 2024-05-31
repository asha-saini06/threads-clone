import { atom } from "recoil";

export const conversationsAtom = atom({
    key: "conversationsAtom",
    default: [],
});

export const selectedConversationAtom = atom({
    key: "selectedConversationAtom",
    default: {
        _id: "", // the id of the conversation
        userId: "", // the id of the user, logged-in user is chatting with
        username: "",
        userProfilePic: "",
    }
})