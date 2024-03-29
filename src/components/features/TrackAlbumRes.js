import React from 'react';
import styled from 'styled-components';

const TrackDiv = styled.div`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #127475;
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
        src={track && track?.album?.images[0]?.url}
        alt=''
        style={{ height: '64px', width: '64px' }}
      />
      <div className='songTitle actual'>
        <div>{track && track.name}</div>
        <div
          style={{
            color: 'lightgray',
            fontSize: '1.4rem',
            opacity: '0.7',
            marginTop: '8px',
          }}
        >
          {track && track?.album?.artists[0].name}
        </div>
      </div>
      <div className='songAlbum'>{track && track?.album.name}</div>
      <div className='songDate'>{track && track?.album.release_date}</div>
      <div className='songTime'>
        {msToMinutesAndSeconds(track && track?.duration_ms)}
      </div>
    </TrackDiv>
  );
};

export default TrackAlbumRes;
