import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { StoreContext } from './components/context/ContextProvider';
import Main from './components/features/Main';
import Playlist from './components/features/playlists/Playlist';
import SeeMore from './components/features/SeeMore';
import SavedTracks from './components/pages/SavedTracks';
import SongList from './components/features/songsList/SongList'
import SearchPage from './components/pages/search/SearchPage';

const AppRouter = ({ chooseTrack, accessToken }) => {
  const { state } = useContext(StoreContext);
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Main chooseTrack={chooseTrack} />
        </Route>
        <Route exact path='/search'>
          <SearchPage accessToken={accessToken}/>
        </Route>
        <Route path='/savedTracks'>
          <SavedTracks chooseTrack={chooseTrack} playList={state.savedTracks} />
        </Route>
        <Route path='/tracks/:id'>
          <SongList chooseTrack={chooseTrack} />
        </Route>
        <Route path='/:id'>
          <SeeMore accessToken={accessToken} />
          {state.isClicked && <Playlist chooseTrack={chooseTrack} />}
        </Route>
        {/* <Redirect to='/' /> */}
      </Switch>
    </>
  );
};

export default AppRouter;
