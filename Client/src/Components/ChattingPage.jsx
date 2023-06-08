import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';

//import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import InputEmoji from "react-input-emoji";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentMessages, sendMessageApi, DeleteChatApi } from "./Redux/Chatting/action";
import { sendMessage } from "./Redux/Chatting/action";
import { addUnseenmsg } from "./Redux/Notification/action";

import io from "socket.io-client";
const SERVER_POINT = "http://localhost:5000";
var socket, currentChattingWith;

export const ChattingPage = () => {
  const { user, token, currentuser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.chatting);
  var { unseenmsg } = useSelector((store) => store.notification);
  const {
    chatting: {
   
      chatName,
      user: { profilePic, username },
      _id,
    },
  } = useSelector((store) => store.chatting);
  const scrolldiv = createRef();
  const dispatch = useDispatch();
  useEffect(() => {
    socket = io(SERVER_POINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      // setconnectedtosocket(true);
    });
  }, []);
  useEffect(() => {
    //_id is of selected chat so that user can join same chat room
    if (!_id) return;
    dispatch(fetchCurrentMessages(_id, token, socket));

    currentChattingWith = _id;
  }, [_id]);
  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrolldiv.current);
  });

  useEffect(() => {




    socket.on("message recieved", (newMessage) => {
     // if (!currentChattingWith || currentChattingWith !== newMessage.chat._id) {
       // handleNotyfy(newMessage);
      //}
      
     // else {
        dispatch(sendMessage(newMessage));
     // }
    });
  }, []);


  // const handleNotyfy = (newMessage) => {
  //   dispatch(addUnseenmsg(newMessage));
  // };



  function handleOnDeleteChat() {
    dispatch(
      DeleteChatApi(


        _id,
        token


      )
    );
  }








  return (
    <div className="chattingpage">
      <div className="top-header">
        <div className="user-header">
        
          <p className="user-name">{username}</p> 
        </div>
        <div>
          <div className="user-fet">
            <SearchIcon />
            <CallIcon />
            <VideoCallIcon />
            <MoreHorizIcon />
            <DeleteIcon
            onClick={()=>handleOnDeleteChat()}


            />
          </div>
        </div>
      </div>
      <div ref={scrolldiv} className="live-chat">
        {messages?.map((el, index) => (
          <div
            key={index}
            className={
              el.sender._id != user._id ? "rihgtuser-chat" : "leftuser-chat"
            }
          >
            <div
              className={el.sender._id != user._id ? "right-avt" : "left-avt"}
            >
              <div className={ChatlogicStyling(el.sender._id, user._id)}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </div>

              {isSameSender(messages, index) ? (
                <Avatar
                  src={el.sender._id != user._id ? el.sender.profilePic : user.profilePic}
                />
              ) : (
                <div className="blank-div"></div>
              )}


            </div>
          </div>
        ))}
      </div>
      <div className="sender-cont">
        <InputContWithEmog id={_id} token={token} socket={socket} />
      </div>
    </div>
  );
};

function InputContWithEmog({ id, token, socket }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleOnEnter(text) {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket,
        _id
      )
    );
  }



  function handleChatClick() {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket
      )
    );
    setText("");
  }

  return (
    <>
      {/* {currentuser?.name} */}

      <div className="search-cont send-message">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>


<button
className=" btn-send"
onClick={handleChatClick}
>
<SendIcon />
</button>

    
    </>
  );
}
