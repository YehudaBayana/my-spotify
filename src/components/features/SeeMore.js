import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { StoreContext } from "../context/ContextProvider";
import AlbumImg from "./AlbumImg";

const SeeMore = ({ accessToken }) => {
  const { state, dispatch, updatePlaylist, spotifyApi } =
    useContext(StoreContext);
  const { id } = useParams();
  let news = state.genres.find((playlists) => {
    return playlists[0].id === id;
  });

  return (
    <>
      <article className="flow">
        <h1>{news[0].name}</h1>
        <p>{news[0].description}</p>
        <div className="team">
          <div className="auto-grid" role="list">
            {news?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    dispatch({ type: "setIsClicked" });
                    return updatePlaylist(item.id);
                  }}
                >
                  <p className="profile">
                    <p>{item.name}</p>
                    <img src={item.images[0].url} alt="" width="100%" />
                    {/* <AlbumImg
                      imgUrl={item.images[0].url}
                      updatePlaylist={() => updatePlaylist(item.id)}
                    /> */}
                  </p>
                </li>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
};

export default SeeMore;
