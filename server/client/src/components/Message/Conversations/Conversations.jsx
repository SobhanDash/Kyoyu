import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux";
import css from "./convos.module.css";
import nodp from "../../../images/nodp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
const oncircle = <FontAwesomeIcon icon={faCircle} />;

const Conversations = ({profile,setClick,setReceiver,onlineUsers,setSender}) => {
  const dispatch = useDispatch();
  const { conversations, messages } = useSelector((state) => state.messageReducer,shallowEqual);
  
  const myconvos =
    conversations &&
    [...conversations].filter(
      (cnv) =>
        cnv.recipients[0]._id === profile._id ||
        cnv.recipients[1]._id === profile._id
    );

  useEffect(() => {
    dispatch(actionCreators.getConversations());
  }, [messages, conversations?.length, dispatch]);

  const onCnvClick = (receiver, sender) => {
    setReceiver(receiver);
    setSender(sender);
    setClick(true);
  };

  return (
    <div className={css.convos}>
      <div>
        <div className={css.top}>
          <img src={profile.about.profilepic} alt={profile.username} />
          <h3>{profile.username}</h3>
        </div>
        <div className={css.bottom}>
          {myconvos.length === 0 && <h2>No Conversations to show!</h2>}
          {myconvos.length > 0 &&
            myconvos.map((cnv) => {
              return (
                <div className={css.cflex} key={cnv._id}>
                  <div
                    className={css.cnv}
                    onClick={() =>
                      onCnvClick(cnv.recipients[1], cnv.recipients[0])
                    }
                  >
                    <img
                      src={
                        cnv.recipients[0]._id === profile._id
                          ? cnv.recipients[1].about.profilepic
                            ? cnv.recipients[1].about.profilepic
                            : nodp
                          : cnv.recipients[0].about.profilepic
                          ? cnv.recipients[0].about.profilepic
                          : nodp
                      }
                      alt=""
                    />
                    <div className={css.cnvflex}>
                      <h2>
                        {cnv.recipients[0]._id === profile._id
                          ? cnv.recipients[1].name
                            ? cnv.recipients[1].name
                            : "Deleted User"
                          : cnv.recipients[0].name
                          ? cnv.recipients[0].name
                          : "Deleted User"}
                        {onlineUsers.includes(
                          cnv.recipients[0]._id === profile._id
                            ? cnv.recipients[1]._id
                            : cnv.recipients[0]._id
                        ) ? (
                          <span className={css.online}>{oncircle}</span>
                        ) : (
                          <span className={css.offline}>{oncircle}</span>
                        )}
                      </h2>
                      {cnv.text !== null || cnv.media.length !== 0 ? (
                        <p>
                          {cnv.recipients[0]._id === profile._id
                            ? "You"
                            : cnv.recipients[0].username}{" "}
                          : {cnv.text}
                        </p>
                      ) : (
                        <p className={css.newcnv}>
                          Send message to start conversation!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
