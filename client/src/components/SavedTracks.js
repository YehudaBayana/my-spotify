import React from 'react';

const SavedTracks = ({ playList, chooseTrack }) => {
  function handleClick(track) {
    chooseTrack(track);
  }
  return (
    <>
      {playList &&
        playList.items?.map((track, i) => {
          return (
            <>
              <img
                onClick={() => handleClick(track)}
                src={track.album.images[0].url}
                alt=''
                style={{ height: '64px', width: '64px' }}
              />
              <div style={{ width: '30%', marginLeft: '10px' }}>
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
              <div style={{ width: '30%', textAlign: 'center' }}>
                {track.album.name}
              </div>
              <div style={{ width: '20%', textAlign: 'center' }}>
                {track.album.release_date}
              </div>
            </>
          );
        })}
    </>
  );
};

export default SavedTracks;
