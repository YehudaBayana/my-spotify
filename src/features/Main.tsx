import React, { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import EachSlider from "./eachSlider/EachSlider";

interface MainProps {
  drawerWidthState: number;
}

const Main: React.FC<MainProps> = ({ drawerWidthState }) => {
  const { state } = useContext(StoreContext);

  return (
    <>
      {state.isLoading ? (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" alt="Loading" />
      ) : (
        <>
          {state.genres.map((item: any, i: number) => {
            return state.playlistDes[i] !== "New Releases" ? <EachSlider drawerWidthState={drawerWidthState} key={item.id} playlists={item} des={state.playlistDes[i]} /> : null;
          })}
        </>
      )}
    </>
  );
};

export default Main;
