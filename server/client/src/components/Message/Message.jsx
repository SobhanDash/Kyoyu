import React, { useEffect, useState } from "react";
import css from "./msg.module.css";
import Conversations from "./Conversations/Conversations";
import CurrentChat from "./CurrentChat/CurrentChat";
import { actionCreators } from "../../redux";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import OnlineUsers from "./OnlineUsers";
import BackButton from "./BackButton";

const Message = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);
  const [click, setClick] = useState(false);
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    dispatch(actionCreators.getProfile());
  }, [dispatch]);

  return (
    <>
      <BackButton />
      <div className={css.msg_container}>
        <Conversations
          profile={profile}
          setClick={setClick}
          setReceiver={setReceiver}
          setSender={setSender}
          onlineUsers={onlineUsers}
        />
        <CurrentChat
          profile={profile}
          receiver={receiver}
          setReceiver={setReceiver}
          sender={sender}
          setSender={setSender}
          click={click}
          setOnlineUsers={setOnlineUsers}
        />
      </div>
      <OnlineUsers users={onlineUsers} setClick={setClick} setReceiver={setReceiver} setSender={setSender} />
      {/* <Suggestions /> */}
    </>
  );
};

export default Message;
