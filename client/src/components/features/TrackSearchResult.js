import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      style={{
        display: 'flex',
        margin: '10px',
        background: 'gray',
        borderRadius: '5px',
      }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: '64px', width: '64px' }}
        alt=''
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          marginLeft: '10px',
        }}
      >
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  );
}
