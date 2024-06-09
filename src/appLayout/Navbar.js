import React, { useContext } from "react";
import "../../index.css";
import { StoreContext } from "../context/ContextProvider";
import { reducerActionTypes } from "../constants";

const Navbar = ({ searchRef }) => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <header>
      <div className="nav-left">
        <input
          ref={searchRef}
          onChange={(e) =>
            dispatch({
              type: reducerActionTypes.SET_SEARCH,
              payload: e.target.value,
            })
          }
          className="nav-search"
          type="text"
          placeholder=" Search"
        />
      </div>
      <div className="logoWrapper">
        <h1 className="logo">yuda music</h1>
      </div>
      <div className="nav-right">
        <img
          className="nav-image"
          src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-22.jpg"
          alt=""
        />
        <p className="username">{state.userName}</p>
      </div>
    </header>
  );
};

export default Navbar;
