import React, { useEffect } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { Avatar, Box, Divider, IconButton, Switch,styled } from "@mui/material";
import {useTheme} from "@mui/material/styles"
import { useState } from "react";
import { faker } from '@faker-js/faker';

import Logo from "../../assets/Images/logo.ico"
import Stack from '@mui/material/Stack';
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import useSettings from "../../hooks/useSettings"
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation,  showSnackbar } from "../../redux/slices/app";
import { AddDirectConversation, UpdateDirectConversation } from "../../redux/slices/conversation";




const DashboardLayout = () => {
  const dispatch=useDispatch();
  const {isLoggedIn}=useSelector((state)=>state.auth);
  const {conversations}=useSelector((state)=>state.conversation.direct_chat)

  const user_id=window.localStorage.getItem( "user_id");

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     window.onload = function () {
  //       if (!window.location.hash) {
  //         window.location = window.location + "#loaded";
  //         window.location.reload();
  //       }
  //     };

  //     window.onload();

  //     if (!socket) {
  //       connectSocket(user_id);
  //     }


  //     //"new_friend_request"
  //     socket.on("new_friend_request",(data)=>{
  //       dispatch(showSnackbar({severity:"success",message:data.message}));
  //     });

  //     socket.on("request_accepted",(data)=>{
  //       dispatch(showSnackbar({severity:"success",message:data.message}));
  //     });
  //     socket.on("request_sent",(data)=>{
  //       dispatch(showSnackbar({severity:"success",message:data.message}));
  //     });

     
  // }
  //   return ()=>{
  //     socket?.off("new_friend_request");
  //     socket?.off("request_accepted");
  //     socket?.off("request_sent");

  //   }

  // },[isLoggedIn,socket])

  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location = window.location + "#loaded";
      //     window.location.reload();
      //   }
      // };

      // window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          })
        );
      });

      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("start_chat",(data)=>{
          
          // const existing_conversation=conversations.find((el)=>el.id === data._id);
          // console.log("Existing Convo:",existing_conversation);

          // if(existing_conversation){
          //   dispatch(UpdateDirectConversation({conversation:data}));
          // }else{
            //add direct conversation
            console.log("Direct Convo started")
            dispatch(AddDirectConversation({conversation:data}))
          // }
          dispatch(SelectConversation({room_id:data._id}));
      })
      socket.on("open_chat",(data)=>{
          
        
        
          dispatch(UpdateDirectConversation({conversation:data}));
       
          //add direct conversation
    
        dispatch(SelectConversation({room_id:data._id}));
    })
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      
    };
  }, [isLoggedIn, socket]);

  if(!isLoggedIn){
    return <Navigate to='/auth/login'/>
  }

  return (
    <Stack direction={"row"}>
      <SideBar/>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
