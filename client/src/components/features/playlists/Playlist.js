import React from 'react';
import TrackAlbumRes from '../TrackAlbumRes';
import './playlist.css';

const Playlist = ({ setIsClicked, chooseTrack, playList, detail }) => {
  return (
    <>
      <div className='opacity'>
        <div className='sticky'>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsClicked()}>
            &#10005;
          </span>
          <div className='playlistWrapper'>
            <div className='playlistDetails'>
              <img src={detail?.images[0].url} alt='' width='250px' />

              <div style={{ marginLeft: '30px' }}>
                <p>playlist</p>
                <h2>{detail.name}</h2>
                <p>{detail.description}</p>
                <h4>{detail.tracks.total} songs</h4>
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
