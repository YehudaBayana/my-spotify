import React from 'react';
import styled from 'styled-components';

const TrackDiv = styled.div`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: darkgreen;
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
      className='d-flex m-2 align-items-center'
      style={{ display: 'flex', alignItems: 'center', margin: '10px' }}
      onClick={handlePlay}
    >
      <img
        src={track.album.images[0].url}
        alt=''
        style={{ height: '64px', width: '64px' }}
      />
      <div className='ml-3' style={{ width: '30%', marginLeft: '10px' }}>
        <div>{track.name}</div>
        <div
          style={{
            color: 'lightgray',
            fontSize: '0.9rem',
            opacity: '0.7',
            marginTop: '8px',
          }}
        >
          {track.album?.artists[0].name}
        </div>
      </div>
      <div style={{ width: '30%', textAlign: 'center' }} className='ml-3'>
        {track.album.name}
      </div>
      <div style={{ width: '20%', textAlign: 'center' }} className='ml-3'>
        {track.album.release_date}
      </div>
      <div style={{ width: '10%', textAlign: 'center' }} className='ml-3'>
        {msToMinutesAndSeconds(track.duration_ms)}
      </div>
    </TrackDiv>
  );
};

export default TrackAlbumRes;
