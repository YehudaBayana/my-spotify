import React from 'react';

const Discover = ({ partyPlaylist, setIsClicked, getOne, AlbumImg }) => {
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
            {partyPlaylist?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setIsClicked((oldVal) => !oldVal);
                    return getOne(item.id);
                  }}
                >
                  <p className='profile'>
                    {/* <h5 className='profile__name'>{item.description}</h5> */}
                    <p>{item.name}</p>
                    <img src={item.images[0].url} alt='' width='100%' />
                    {/* <AlbumImg imgUrl={item.icons[0].url} /> */}
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

export default Discover;
