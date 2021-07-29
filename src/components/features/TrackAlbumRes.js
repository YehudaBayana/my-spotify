import React from 'react';
import styled from 'styled-components';

const TrackDiv = styled.div`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgb(30, 215, 96);
  }
`;

const TrackAlbumRes = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }
  function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <TrackDiv
      style={{ display: 'flex', alignItems: 'center', margin: '10px' }}
      onClick={handlePlay}
    >
      <img
        src={track.album?.images[0].url}
        alt=''
        style={{ height: '64px', width: '64px' }}
      />
      <div className='songTitle actual'>
        <div>{track.name}</div>
        <div
          style={{
            color: 'lightgray',
            fontSize: '1.4rem',
            opacity: '0.7',
            marginTop: '8px',
          }}
        >
          {track.album?.artists[0].name}
        </div>
      </div>
      <div className='songAlbum'>{track.album.name}</div>
      <div className='songDate'>{track.album.release_date}</div>
      <div className='songTime'>{msToMinutesAndSeconds(track.duration_ms)}</div>
    </TrackDiv>
  );
};

export default TrackAlbumRes;
