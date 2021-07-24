import React from 'react';
import '../../../index.css';

const Gallery = ({ userPlaylists, setIsClicked, getOne, AlbumImg }) => {
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
            {userPlaylists?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    console.log('dsdfsdfssdf: ', item);
                    setIsClicked((oldVal) => !oldVal);
                    return getOne(item.id);
                  }}
                >
                  <p className='profile'>
                    <p>{item.name}</p>
                    <AlbumImg imgUrl={item.images[0].url} />
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
