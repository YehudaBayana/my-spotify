import React, { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import EachSlider from "./eachSlider/EachSlider";

const Main = ({ chooseTrack }) => {
  const { state } = useContext(StoreContext);

  return (
    <>
      {state.isLoading ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
          alt=""
        />
      ) : (
        <>
          {state.genres.map((item, i) => {
            return state.playlistDes[i] !== "New Releases" ? (
              <EachSlider key={i} playlists={item} des={state.playlistDes[i]} />
            ) : null;
          })}
        </>
      )}
    </>
  );
};

export default Main;
