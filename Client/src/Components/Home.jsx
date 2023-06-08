import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import SideNavbar from "./SideNavbar";
//import { CurrentUserData } from "./Redux/Auth/action";

export const HomeComp = () => {
  const { user, loading, error ,currentuser } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
const dispatch =useDispatch()

useEffect(() => {





},[])



  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-cont">
      <SideNavbar />
     
      <MyChat />
      {chatting._id ? <ChattingPage /> : <MessageStarter {...user}  cureent={currentuser} />}
    </div>
  );
};

const MessageStarter = ({ profilePic, username  }) => {
  return (
    <div className="chattingpage start-msg">
      <div>
        <Avatar src={profilePic} sx={{ width: 70, height: 70 }} />
        <h3>Welcome, {username}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
