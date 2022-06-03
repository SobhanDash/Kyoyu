import React, { useEffect } from "react";
import css from "./suggestion.module.css";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

const Suggestions = () => {
  const dispatch = useDispatch();
  const { profile, suggestions } = useSelector((state) => state.userReducer,shallowEqual);

  const follow = (e,id)=> {
    e.preventDefault();
    dispatch(actionCreators.follow(id));
  }

  useEffect(() => {
    dispatch(actionCreators.getSuggestion());
  }, [dispatch,profile.following.length]);

  return (
    <>
      <div className={css.suggestbar}>
        <div className={css.suggest}>
          <h3>Suggestions For You</h3>
          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((person) => {
              return (
                <div className={css.eachprofile} key={person._id}>
                  <img
                    src={person.about.profilepic}
                    alt={person.name}
                    className={css.eachprofile__img}
                  />
                  <div className={css.eachprofile__names}>
                    <Link
                      to={`/userprofile/${person._id}`}
                      className={css.eachprofile__name}
                    >
                      {person.username}
                    </Link>
                    <button className={css.follow} onClick={(e)=> follow(e,person._id)}>Follow</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Suggestions;
