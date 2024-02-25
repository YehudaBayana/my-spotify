import React, { useContext } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import TrackAlbumRes from '../TrackAlbumRes';
import './playlist.css';

const Playlist = ({ chooseTrack }) => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <>
      <div className='opacity'>
        <div className='sticky'>
          <span
            style={{ cursor: 'pointer', fontSize: '30px' }}
            onClick={() => {
              dispatch({ type: 'setIsClicked' });
            }}
          >
            &#10005;
          </span>
          <div className='playlistWrapper'>
            <div className='playlistDetails'>
              <img src={state?.detail?.images[0].url || ""} alt='' width='250px' />

              <div style={{ marginLeft: '30px' }}>
                <p>playlist</p>
                <h2>{state.detail?.name}</h2>
                <p>{state.detail?.description}</p>
                <h4>{state.detail?.tracks.total} songs</h4>
              </div>
            </div>
            <div>
              <div className='songsInfo'>
                <div className='forImg'></div>
                <div className='songTitle'>Title</div>
                <div className='songAlbum'>Album</div>
                <div className='songDate'>Date added</div>
                <div className='songTime'>time</div>
              </div>
              {state.playList &&
                state.playList.items?.map((track, i) => {
                  return (
                    <TrackAlbumRes
                      track={track}
                      key={i}
                      chooseTrack={chooseTrack}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
