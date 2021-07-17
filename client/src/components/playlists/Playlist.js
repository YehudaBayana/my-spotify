import React from 'react';
import TrackAlbumRes from '../../TrackAlbumRes';

const Playlist = ({ setIsClicked, chooseTrack, playList, detail }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: '100%',
          padding: '0 100px',
          paddingTop: '40px',
          position: 'fixed',
          top: '0px',
          left: '0',
          color: 'white',
          zIndex: '999',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100vh',
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
              <img src={detail?.images[0].url} alt='' width='250px' />

              <div style={{ marginLeft: '30px' }}>
                <p>playlist</p>
                <h2 style={{ fontSize: '60px' }}>{detail.name}</h2>
                <p>{detail.description}</p>
                <h4>{detail.tracks.total} songs</h4>
              </div>
            </div>
            <div>
              <div
                className='d-flex m-2 align-items-center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '10px',
                  cursor: 'context-menu',
                  borderBottom: '1px solid gray',
                  paddingBottom: '15px',
                }}
              >
                <div style={{ width: '64px' }}></div>
                <div
                  className='ml-3'
                  style={{
                    width: '30%',
                    textAlign: 'center',
                    marginLeft: '10px',
                  }}
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
              {playList &&
                playList.items?.map((track, i) => {
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
