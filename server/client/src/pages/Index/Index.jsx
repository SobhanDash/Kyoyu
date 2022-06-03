import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Container";
import Modal from "../../components/Modal/Modal";

import css from "./index.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
// import Suggestions from "../../components/Suggestions/Suggestions";

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, profile, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log(isLoading);
    if (!user) {
      history.push("/login");
    } else {
      dispatch(actionCreators.getProfile());
    }
  }, [dispatch, history, user]);

  if (isLoading && Object.keys(profile).length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user && Object.keys(profile).length > 0 && (
        <Modal show={show} setShow={setShow} />
      )}
      {user && Object.keys(profile).length > 0 && (
        <div className={css.index_container}>
          <div className={css.sidebar}>
            <Sidebar />
          </div>
          <div className={css.feed}>
            <Feed />
          </div>
          {/* <div className={css.suggest}>
            <Suggestions />
          </div> */}
        </div>
      )}
    </>
  );
};

export default Index;
