import React, { Fragment, useEffect, useRef, useState } from "react";
import css from "./currchat.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux";
import { io } from "socket.io-client";
// import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// const sendicon = <FontAwesomeIcon icon={faPaperPlane} />;

const CurrentChat = ({
  profile,
  receiver,
  setReceiver,
  sender,
  setSender,
  click,
  setOnlineUsers,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => state.messageReducer.messages,
    shallowEqual
  );
  // const isLoading = useSelector(
  //   (state) => state.messagereducer.isLoading,
  //   shallowEqual
  // );
  const [newmsg, setNewmsg] = useState("");
  const [arrivedmsg, setArrivedmsg] = useState(null);
  const socket = useRef();
  const scrollRef = useRef(null);

  const onMsgChange = (e) => {
    e.preventDefault();
    setNewmsg(e.target.value);
  };

  const onInputClick = (e) => {
    e.preventDefault();
    // Check properly Tushar
    if (receiver?._id === profile._id) {
      setSender(receiver);
      setReceiver(sender);
    }
  };

  const onSendMsg = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newmsg !== "") {
        dispatch(
          actionCreators.sendMessage({
            socket,
            receiverId: receiver?._id,
            senderId: sender?._id,
            text: newmsg,
          })
        );
        setNewmsg("");
      }
    }
  };

  const socket_url = process.env.REACT_APP_URL;

  useEffect(() => {
    socket.current = io(process.env.NODE_ENV === "development" ? "ws://localhost:9000" : socket_url);
    // console.log(socket.current);
    socket.current.on("getMessage", (data) => {
      setArrivedmsg(data);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", profile._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
      setOnlineUsers(users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile._id, dispatch]);

  useEffect(() => {
    // console.log("run");
    if (receiver) {
      dispatch(actionCreators.getMessages(receiver?._id, sender?._id));
    }
    // eslint-disable-next-line
  }, [dispatch, receiver?._id, sender?._id]);

  useEffect(() => {
    // console.log("run");
    // console.log(Date.now(),arrivedMsg);
    if (arrivedmsg) {
      dispatch(actionCreators.receiveMessages(receiver?._id, sender?._id));
    }
  }, [dispatch, arrivedmsg, receiver?._id, sender?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className={css.currentChat}>
      {click && sender && receiver && (
        <div className={css.receiver}>
          <img src={receiver._id === profile._id ? sender.about.profilepic : receiver.about.profilepic} alt={receiver.username} />
          <h2>{receiver._id === profile._id ? sender.name : receiver.name}</h2>
        </div>
      )}
      <div className={css.messageArea}>
        {click && messages.length !== 0 && receiver ? (
          messages.map((chat) => {
            return (
              <Fragment key={chat._id}>
                {chat.sender._id === profile._id ? (
                  <div className={css.me} ref={scrollRef}>
                    {chat.text ? (
                      <h3>{chat.text}</h3>
                    ) : (
                      <div className={css.image_container}>
                        {chat.images.length > 0 &&
                          chat.images.map((image, index) => {
                            return (
                              <img
                                key={index}
                                src={image}
                                alt="User Media"
                                className={css.media}
                              />
                            );
                          })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={css.other} ref={scrollRef}>
                    <img
                      src={chat.sender.about.profilepic}
                      alt={chat.sender.username}
                      className={css.userpic}
                    />
                    {chat.text ? (
                      <h3>{chat.text}</h3>
                    ) : (
                      chat.images.length > 0 &&
                      chat.images.map((image, index) => {
                        return (
                          <div className={css.image_container}>
                            <img
                              key={index}
                              src={image}
                              alt="User Media"
                              className={css.media}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </Fragment>
            );
          })
        ) : (
          <div className={css.default}>
            <h1>Your messages will be displayed here!</h1>
          </div>
        )}
      </div>
      {click && receiver && (
        <div className={css.messageBox} onClick={onInputClick}>
          <input
            type="text"
            name="text"
            placeholder="Enter your message"
            value={newmsg}
            onChange={onMsgChange}
            onKeyDown={onSendMsg}
          />
        </div>
      )}
    </div>
  );
};

export default CurrentChat;
