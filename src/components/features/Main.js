import React, { useContext } from 'react';

import { StoreContext } from '../context/ContextProvider';
import EachSlider from './eachSlider/EachSlider';
import Gallery from './gallery/Gallery';
import Playlist from './playlists/Playlist';
import TrackSearchResult from './TrackSearchResult';

const Main = ({ chooseTrack }) => {
  const { state } = useContext(StoreContext);

  return (
    <>
      {state.isLoading ? (
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif'
          alt=''
        />
      ) : (
        <>
          <div className='searchResultsWrapper'>
            {state.searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
          <hr />
          {state.categoryPlaylist.map((item, i) => {
            return (
              <EachSlider key={i} playlists={item} des={state.playlistDes[i]} />
            );
          })}
          <Gallery />
          {state.isClicked && <Playlist chooseTrack={chooseTrack} />}
        </>
      )}
    </>
  );
};

export default Main;
