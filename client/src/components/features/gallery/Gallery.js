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
          <ul className='auto-grid' role='list'>
            {userPlaylists?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setIsClicked((oldVal) => !oldVal);
                    return getOne(item.id);
                  }}
                >
                  <a className='profile'>
                    {/* <h5 className='profile__name'>{item.description}</h5> */}
                    <p>{item.name}</p>
                    <AlbumImg
                      setIsClicked={setIsClicked}
                      imgUrl={item.images[0].url}
                      getOne={() => getOne(item.id)}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </>
  );
};

export default Gallery;
