import React from 'react';
import './sideBar.css';
import { Link } from 'react-router-dom';

const SideBar = ({ myFocus, userPlaylists, setIsClicked, getOne }) => {
  return (
    <>
      <div className='sideBar'>
        <div className='navLeft_sub_Container'>
          <div className='navLeft_top'>
            <div className='navMenuBtn_Left'>
              <p>
                <span style={{ fontSize: '36px' }} className='material-icons'>
                  more_horiz
                </span>
              </p>
            </div>
            <div className='mainNavPanel'>
              <div className='navLeft_item'>
                <p>
                  <span
                    style={{ fontSize: '25px' }}
                    className='material-icons hover-white'
                  >
                    home
                  </span>
                </p>
                <p className='navLeft_text hover-white'>
                  <h5>Home</h5>
                </p>
              </div>
              <div onClick={myFocus} className='navLeft_item'>
                <p>
                  <span
                    style={{ fontSize: '25px' }}
                    className='material-icons hover-white'
                  >
                    search
                  </span>
                </p>
                <p className='navLeft_text hover-white'>
                  <h5>Search</h5>
                </p>
              </div>
              <div className='navLeft_item'>
                <p>
                  <span
                    style={{ fontSize: '25px' }}
                    className='material-icons hover-white'
                  >
                    folder
                  </span>
                </p>
                <p className='navLeft_text hover-white'>
                  <h5>Your Library</h5>
                </p>
              </div>
            </div>
            <div className='subNavs'>
              <div className='navLeft_item'>
                <p>
                  <span
                    style={{ fontSize: '25px' }}
                    className='material-icons hover-white'
                  >
                    add_box
                  </span>
                </p>
                <p className='navLeft_text hover-white'>
                  <h5>Create Playlist</h5>
                </p>
              </div>
              <div className='navLeft_item'>
                <p>
                  <span
                    style={{ fontSize: '25px' }}
                    className='material-icons hover-white'
                  >
                    favorite
                  </span>
                </p>
                <Link to='/savedTracks' className='navLeft_text hover-white'>
                  <h5>Liked Songs</h5>
                </Link>
              </div>
            </div>
          </div>

          <div className='navLeft_bottom'>
            <div className='playlistList'>
              {userPlaylists?.map((item) => {
                return (
                  <p
                    style={{ cursor: 'pointer' }}
                    key={item.id}
                    onClick={() => {
                      setIsClicked((oldVal) => !oldVal);
                      return getOne(item.id);
                    }}
                    className='playlistName'
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
