import React, { useContext } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import Playlist from '../playlists/Playlist';
import './mobile.css';

const Mobile = (props) => {
  const { searchRef, chooseTrack, myFocus } = props;
  const { state, getOne, dispatch } = useContext(StoreContext);

  return (
    <>
      <header>
        <input
          ref={searchRef}
          onChange={(e) =>
            dispatch({ type: 'setSearch', payload: e.target.value })
          }
          class='nav-search'
          type='text'
          placeholder=' Search'
        />
        <i className='fas fa-cog'></i>
      </header>
      {!searchRef.current.value && (
        <>
          <section className='top-section'>
            <h1>good afternoon</h1>
            <div className='boxes'>
              {state.userPlaylists?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className='box'
                    onClick={() => {
                      dispatch({ type: 'setIsClicked' });
                      return getOne(item.id);
                    }}
                  >
                    <div className='box__image'>
                      <img src={item.images[0].url} alt='' />
                    </div>
                    <div className='box__title'>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </section>
          <div className='middle-section'>
            {state.categoryPlaylist?.map((item, i) => {
              return (
                <>
                  <h1 key={item.id}>{state.playlistDes[i]}</h1>
                  <div key={item.id} className='large-boxes'>
                    {item?.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className='large-boxes__box'
                          onClick={() => {
                            dispatch({ type: 'setIsClicked' });
                            return getOne(item.id);
                          }}
                        >
                          <img src={item.images[0].url} alt='' />
                          <div className='large-boxes__box--title'>
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>

          {state.isClicked && (
            <Playlist
              chooseTrack={chooseTrack}
              playList={state.playList}
              detail={state.detail}
            />
          )}
        </>
      )}
      <footer className='footerM'>
        <div className='menuM'>
          <div className='menu-item active'>
            <i className='fas fa-home'></i>
            Home
          </div>
          <div className='menu-item' onClick={myFocus}>
            <i className='fas fa-search'></i>
            Search
          </div>
          <div className='menu-item'>
            <i className='fas fa-stream'></i>
            your library
          </div>
        </div>
      </footer>
    </>
  );
};

export default Mobile;
