import React from 'react';
import { useParams } from 'react-router';

const SeeMore = ({ partyPlaylist, setIsClicked, getOne, AlbumImg }) => {
  const { id } = useParams();
  let news = partyPlaylist.find((allus) => {
    return allus[0].id === id;
  });

  return (
    <>
      <article className='flow'>
        <h1>{news[0].name}</h1>
        <p>{news[0].description}</p>
        <div className='team'>
          <div className='auto-grid' role='list'>
            {news?.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setIsClicked((oldVal) => !oldVal);
                    return getOne(item.id);
                  }}
                >
                  <p className='profile'>
                    <p>{item.name}</p>
                    <AlbumImg
                      setIsClicked={setIsClicked}
                      imgUrl={item.images[0].url}
                      getOne={() => getOne(item.id)}
                    />
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

export default SeeMore;
