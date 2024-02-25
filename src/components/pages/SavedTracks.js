import React, { useContext } from 'react';
import '../features/playlists/playlist.css';
import styled from 'styled-components';
import { StoreContext } from '../context/ContextProvider';

const TrackDiv = styled.div`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #1583ff;
    color: white;
  }
`;

const SavedTracks = ({ chooseTrack }) => {
  const { state } = useContext(StoreContext);
  let playList = state.savedTracks;

  function handleClick(track) {
    chooseTrack(track);
  }

  function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <>
      <div style={{ maxWidth: '1125px', margin: '10px auto' }}>
        <div className='songsInfo'>
          <div className='forImg'></div>
          <div className='songTitle'>Title</div>
          <div className='songAlbum'>Album</div>
          <div className='songDate'>Date added</div>
          <div className='songTime'>time</div>
        </div>
        {playList &&
          playList.items?.map((track, i) => {
            return (
              <>
                <TrackDiv key={i}>
                  <div
                    onClick={() => handleClick(track)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={track.album?.images[0].url || ""}
                      alt=''
                      style={{ height: '64px', width: '64px' }}
                    />
                    <div className='songTitle actual'>
                      <div>{track.name}</div>
                      <div
                        style={{
                          color: 'gary',
                          fontSize: '0.9rem',
                          opacity: '0.7',
                          marginTop: '8px',
                        }}
                      >
                        {track.album?.artists[0].name}
                      </div>
                    </div>
                    <div className='songAlbum'>{track.album.name}</div>
                    <div className='songDate'>{track.album.release_date}</div>
                    <div className='songTime'>
                      {msToMinutesAndSeconds(track.duration_ms)}
                    </div>
                  </div>
                </TrackDiv>
              </>
            );
          })}
      </div>
    </>
  );
};

export default SavedTracks;
