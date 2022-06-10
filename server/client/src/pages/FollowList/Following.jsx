import React, { useEffect, useState } from "react";
import css from "./followlist.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Following = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, profile, isLoading } = useSelector((state) => state.userReducer,shallowEqual);

  const following = profile.following;

  const unfollow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch(actionCreators.getProfile());
    }
  }, [user, following.length, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={css.container}>
      <div>
        <Sidebar isProfile={profile} />
      </div>
      <div className={css.main}>
        <h1 className={css.header}>Following</h1>
        <ul className={css.userdiv}>
          {following.map((user) => {
            return (
              <li key={user?._id} className={css.followList}>
                <div className={css.card_wrapper}>
                  <div className={css.fpicdiv}>
                    <img
                      src={user?.about.profilepic}
                      alt="users"
                      width="40px"
                      className={css.fpic}
                    />
                  </div>
                  <div className={css.user_info}>
                    <Link
                      to={`/users/${user?._id}/${user?.username}`}
                      className={css.user_name}
                    >
                      {user?.username}
                    </Link>
                  </div>
                </div>
                <div className={css.btnDiv}>
                  <button
                    className={css.followBtn}
                    onClick={(e) => unfollow(e, user?._id)}
                  >
                    Unfollow
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Following;
