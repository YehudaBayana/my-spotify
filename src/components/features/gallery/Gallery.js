import React, { useContext } from 'react';
import '../../../index.css';
import { StoreContext } from '../../context/ContextProvider';
import AlbumImg from '../AlbumImg';

const Gallery = () => {
  const { state, getOne, dispatch } = useContext(StoreContext);
  return (
    <>
      <article className='flow'>
        <h1>playlists</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          recusandae nemo earum tempora quos ratione asperiores illo fuga in
          officiis.
        </p>
        <div className='team'>
          <div className='auto-grid' role='list'>
            {state.userPlaylists?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    console.log('dsdfsdfssdf: ', item);
                    dispatch({ type: 'setIsClicked' });
                    return getOne(item.id);
                  }}
                >
                  <p className='profile'>
                    <p>{item.name}</p>
                    <img src={item.images[0].url} alt='' width='100%' />
                    {/* <AlbumImg imgUrl={item.images[0].url} /> */}
                  </p>
                </li>
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
};

export default Gallery;
