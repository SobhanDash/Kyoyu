import React, { useEffect, useState } from "react";
import css from "./search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import { Link } from "react-router-dom";

const searchicon = <FontAwesomeIcon icon={faSearch} />;
const closeicon = <FontAwesomeIcon icon={faTimes} />;

const SearchBar = () => {
  const [person, setPerson] = useState("");

  const { searchedUsers, profile } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (person !== "") {
      dispatch(actionCreators.searchUsers(person));
    }
  }, [person, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPerson(e.target.value);
  };

  const handleClose = () => {
    setPerson("");
  };

  return (
    <div className={css.wrapper}>
      <div className={css.searchbar}>
        <span className={css.icon}>{searchicon}</span>
        <input
          type="text"
          className={css.search_text}
          value={person}
          onChange={handleSearch}
        />
        <span className={css.cicon} onClick={handleClose}>
          {closeicon}
        </span>
      </div>

      {person && searchedUsers.length === 0 ? (
        <h4 className={css.empty}>No Results Found</h4>
      ) : (
        person !== "" &&
        searchedUsers.length > 0 && (
          <ul className={css.list}>
            {searchedUsers.map((item) => {
              if (item._id !== profile._id) {
                return (
                  <Link
                    className={css.list__li}
                    key={item._id}
                    to={`/userprofile/${item._id}`}
                  >
                    <div className={css.li__details}>
                      <img
                        src={item.about.profilepic}
                        alt={item.name}
                        className={css.li__details_img}
                      />
                      <div className={css.li__details_names}>
                        <span className={css.li__username}>
                          {item.username}
                        </span>
                        <span className={css.li__name}> {item.name}</span>
                      </div>
                    </div>
                  </Link>
                );
              }
              return null;
            })}
          </ul>
        )
      )}
    </div>
  );
};

export default SearchBar;
