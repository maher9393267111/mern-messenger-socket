
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeSearchApi ,   makeSearchName ,Allusers } from "./Redux/Searching/action";
import { useSelector } from "react-redux";
import { accessChat, makeRecentChatApi } from "./Redux/RecentChat/action";
import { selectChat } from "./Redux/Chatting/action";
import { removeSeenMsg } from "./Redux/Notification/action";
export const MyChat = () => {
  const [search, setSearch] = useState(false);
  const { search_result, loading, error } = useSelector(
    (store) => store.search
  );
  const { recent_chat, loading: chat_loading } = useSelector(
    (store) => store.recentChat
  );
  const { user, token } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const { notification, unseenmsg } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TOKEN_____" ,token)

    if (token) {
      dispatch(Allusers());
      dispatch(makeRecentChatApi(token));
    
    
    }
  }, [user]);
  const ref = useRef();
  const handleQuery = (e) => {
    let id;
    return function (e) {
      if (!e.target.value) {
        setSearch(false);
        return;
      }
      if (ref.current) clearTimeout(ref.current);
      setSearch(true);
      ref.current = setTimeout(() => {
        dispatch(
         // makeSearchApi
         makeSearchName(e.target.value));
      }, 1000);
    };
  };

  return (
    <div className="mychat-cont">
      <div>
        <div className="notification my-2">
          <h2>MESSENGER</h2>
     
        </div>
  


<div>

<div><h3 className="my_chat_header">My Chats</h3></div>



            {   recent_chat?.map((el, index) => (
                 <ChatUserComp
                   key={el._id}
                   {...el}
                   index={index}
                   chattingwith={chatting._id}
                   id={user._id}
                />
               ))} 




</div>







      </div>
      <div className="recent-chat">
        <h3 className="Recent contacts_header">All  Contacts</h3>
        <div className="recent-user">
          {/* {search */}
            {/* ? */}
            
           {  search_result?.map((el) => (
                <SearchUserComp
                  key={el._id}
                  {...el}
                  token={token}
                  recent_chat={recent_chat}
                  setSearch={setSearch}
                />
              ))

           }


         
        </div>








      </div>
    </div>
  );
};



// -----notification comp here---


const ChatUserComp = ({
  //isGroupChat,
  chatName,
  users,
  latestMessage,
  id,
  _id,
  index,
  chattingwith,
}) => {
  const dispatch = useDispatch();
  const handleSelectChat = () => {
    dispatch(
      selectChat({
       // isGroupChat,
        index,
        user: users.find((el) => el._id != id),
        _id,  //chatId
        chatName,
      })
    );
  };
  return (
    <div
      onClick={handleSelectChat}
      className={chattingwith == _id ? "user selectUser" : "user"}
    >
      <div className="history-cont">
   
 <div>{<Avatar src={users.find((el) => el._id != id)?.profilePic} />}</div>


        <div>
       

<p className="name">{users.find((el) => el._id != id)?.username}</p>



          <p className="chat">
            {latestMessage
              ? latestMessage.content.length > 8
                ? latestMessage.content.substring(0, 30) + " . . ."
                : latestMessage.content
              : ""}
          </p>
        </div>
      </div>
      <div>
        {latestMessage ? (
          <p className="time">
            {new Date(latestMessage?.updatedAt).getHours() +
              ":" +
              new Date(latestMessage?.updatedAt).getMinutes()}
          </p>
        ) : (
          ""
        )}
        
      </div>
    </div>
  );
};

export const SearchUserComp = ({
  _id,
  username,
 
  profilePic,
  token,
  recent_chat,
  setSearch,
}) => {
  const dispatch = useDispatch();
  const handleSubmitForAcceChat = () => {
    dispatch(accessChat(_id, token, recent_chat));
    setSearch(false);
  };
  return (
    <div onClick={handleSubmitForAcceChat} className="user">
      <div className="history-cont">
        <div>{<Avatar src={profilePic} />}</div>
        <div>
          
          <p className="chat">
       
        Name: {username}
          </p>
        </div>
      </div>
    </div>
  );
};









