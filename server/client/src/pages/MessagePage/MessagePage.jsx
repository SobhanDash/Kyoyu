import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import css from "./msgpage.module.css";
import Message from "../../components/Message/Message";

const MessagePage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className={css.msgpage}>{user && <Message />}</div>
    </>
  );
};

export default MessagePage;
