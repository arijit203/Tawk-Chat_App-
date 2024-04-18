import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

import { ChatHeader, ChatFooter } from "../../components/Chat";
import useResponsive from "../../hooks/useResponsive";
import { Chat_History } from "../../data";
import {
  Timeline,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "../../components/Conversation/MsgTypes";


import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";
import { SimpleBarStyle } from "../../components/Scrollbar";

const Conversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);
    // console.log(current,"****");
    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      // console.log("List of messages:",data);
      // console.log("Room Id got changed to",room_id)
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation(current));
  }, [room_id]);
  const {current_messages} = useSelector(
    (state) => state.conversation.direct_chat
  );
  // console.log("current_messages",current_messages)
  // useEffect(() => {
  //   socket.emit("get_direct_conversations", (data) => {
  //     console.log(data); // this data is the list of conversations
  //     // dispatch action

  //     dispatch(fetchDirectConversations({ conversations: data }));
  //     console.log("Trying to fetch direct chats:")
  //   });
  // }, [room_id]);
  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {current_messages.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();
  const dispatch=useDispatch();

  const messageListRef = useRef(null);
  const { room_id } = useSelector((state) => state.app);
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );


  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  

  useEffect(() => {
    // Additional logic when room_id changes
    console.log("Room ID changed:", room_id);
    // Add any additional logic you need here
   
    const current = conversations.find((el) => el?.id === room_id);
    console.log("current:",current)

    dispatch(SetCurrentConversation(current));
  }, [room_id]);
  
  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*  */}
      <ChatHeader />
      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",

          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>

      {/*  */}
      <ChatFooter />
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
