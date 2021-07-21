import React from 'react';

const AlbumImg = ({ imgUrl, setIsClicked, getOne }) => {
  return (
    <>
      <img
        onClick={() => {
          getOne();
          setIsClicked((oldValue) => !oldValue);
        }}
        src={imgUrl}
        alt=''
        width='100%'
      />
    </>
  );
};

export default AlbumImg;
