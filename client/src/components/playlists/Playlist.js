import React from 'react';
import TrackAlbumRes from '../../TrackAlbumRes';

const Playlist = ({ setIsClicked, chooseTrack, playList }) => {
  return (
    <>
      <div
        className='margin-le'
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: 'calc(100% - 40px)',
          padding: '0 100px',
          paddingTop: '40px',
          position: 'fixed',
          top: '0px',
          color: 'white',
          marginLeft: '133px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '88vh',
            position: 'sticky',
            bottom: '0px',
            overflow: 'auto',
          }}
        >
          <span style={{ cursor: 'pointer' }} onClick={() => setIsClicked()}>
            &#10005;
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              padding: '20px',
            }}
          >
            <div
              style={{
                padding: '20px 0',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <img src={playList?.items[3].album.images[1].url} alt='' />

              <div style={{ marginLeft: '30px' }}>
                <p>playlist</p>
                <h2 style={{ fontSize: '60px' }}>{playList.items[3].name}</h2>
                <p>user 7 songs, 34 minutes 26 seconds</p>
              </div>
            </div>
            <div>
              <div
                className='d-flex m-2 align-items-center'
                style={{
                  cursor: 'context-menu',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid gray',
                  paddingBottom: '15px',
                }}
              >
                <div
                  className='ml-3'
                  style={{ width: '30%', textAlign: 'center' }}
                >
                  Title
                </div>
                <div
                  style={{ width: '30%', textAlign: 'center' }}
                  className='ml-3'
                >
                  Album
                </div>
                <div
                  style={{ width: '20%', textAlign: 'center' }}
                  className='ml-3'
                >
                  Date added
                </div>
                <div
                  style={{ width: '10%', textAlign: 'center' }}
                  className='ml-3'
                >
                  time
                </div>
              </div>
              {playList.items?.map((track) => {
                return (
                  <TrackAlbumRes
                    track={track}
                    key={track.uri}
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
