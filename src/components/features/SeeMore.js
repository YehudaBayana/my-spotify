import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../context/ContextProvider';
import AlbumImg from './AlbumImg';

const SeeMore = () => {
  const { state, dispatch, getOne } = useContext(StoreContext);
  const { id } = useParams();
  let news = state.categoryPlaylist.find((playlists) => {
    return playlists[0].id === id;
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
                    dispatch({ type: 'setIsClicked' });
                    return getOne(item.id);
                  }}
                >
                  <p className='profile'>
                    <p>{item.name}</p>
                    <img src={item.images[0].url} alt='' width='100%' />
                    {/* <AlbumImg
                      imgUrl={item.images[0].url}
                      getOne={() => getOne(item.id)}
                    /> */}
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
