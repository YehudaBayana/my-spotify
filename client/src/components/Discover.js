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
          <ul className='auto-grid' role='list'>
            {partyPlaylist?.map((item) => {
              return (
                <li
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

export default Discover;
