import React, { useEffect, Fragment } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";

import styles from "./onlineUsers.module.css";

const OnlineUsers = ({ users, setClick, setSender, setReceiver }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, profile, onlineUsers } = useSelector(state => state.userReducer,shallowEqual);

  const redirect = (e,user) => {
    e.preventDefault();
    dispatch(actionCreators.newCnv(profile._id, user._id));
    setReceiver(user);
    setSender(profile);
    setClick(true);
  }

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } 
    else {
      dispatch(actionCreators.getOnlineUsers(users));
    }
  }, [user,users,dispatch,history]);

  return (
    <div className={styles.online_wrap}>
      <h2 className={styles.head}>Online Users</h2>
      {onlineUsers && onlineUsers.length === 1 ? 
        (<div className={styles.no_user}>
            <h2>No user is online!</h2>
        </div>)
        :
        (<div className={styles.user_list}>
            {onlineUsers && onlineUsers.length > 1 && onlineUsers.map((user) => {
                return(
                    <Fragment key={user._id}>
                        {user._id !== profile._id && <div className={styles.onlineUser} onClick={(e)=> redirect(e,user)}>
                            <img src={user.about.profilepic} alt={user.username} />
                            <h4>{user.username}</h4>
                        </div>}
                    </Fragment>
                );
            })}
        </div>)
      }
    </div>
  );
};

export default OnlineUsers;
