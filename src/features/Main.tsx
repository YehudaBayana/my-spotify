import React, { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import EachSlider from "./eachSlider/EachSlider";
import { ListenAgainList } from 'src/pages/home/ListenAgainList';

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
        <ListenAgainList/>
          {state.genres.map((genre: any, i: number) => {
            return state.playlistDes[i] !== "New Releases" ? <EachSlider id={genre.id} drawerWidthState={drawerWidthState} key={genre.id} playlists={genre.items} description={state.playlistDes[i]} /> : null;
          })}
        </>
      )}
    </>
  );
};

export default Main;
