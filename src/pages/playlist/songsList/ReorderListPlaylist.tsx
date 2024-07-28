import React, { useContext, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import SearchToAdd from './SearchToAdd';
import { ListItem, Avatar, ListItemButton, Checkbox, Box, Divider, Typography } from '@mui/material';
import CheckedTracksActions from './CheckedTracksActions';
import './songsList.css';
import PlaylistHeader from '../playlistHeader/PlaylistHeader';
import { StoreContext } from '../../../context/ContextProvider';
import { Artist, Playlist, Track } from '../../../types';
import { addTracksToPlaylist, fetchPlayableItems, removeFromPlaylist, updatePlaylistOrder } from '../../../customHooks/useFetchMusicInfo';
import { reducerActionTypes } from '../../../constants';
import { handleCheckboxToggle, handlePlayTrack, msToMinutesAndSeconds } from '../../../utils';

// const StyledListItemNew = styled(ListItem)(({ theme }) => ({
//   whiteSpace: 'nowrap',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
//   padding: '10px',
// }));

interface Item {
  id: string;
  content: string;
}

interface ReorderListPlaylistProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReorderListPlaylist: React.FC<ReorderListPlaylistProps> = ({ edit, setEdit }) => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split('/').filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const { accessToken, checkedTracks } = state;
  const [draggedItem, setDraggedItem] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPlaylistEditable, setIsPlaylistEditable] = useState(false);
  const [sourceIndex, setSourceIndex] = useState<number>(0);
  const [destinationIndex, setDestinationIndex] = useState<number>(0);
  const properTracks = tracks?.filter((item) => item);

  const [playlist, setPlaylist] = useState<Playlist>({
    id: '',
    name: '',
    description: '',
    owner: { id: '' },
    images: [{ url: '' }],
    tracks: { total: 0 },
    snapshot_id: '',
    public: false,
    type: '',
  });
  const [rgb, setRgb] = useState<string>('');

  useEffect(() => {
    if (playlist?.owner?.id === state?.userName?.id) {
      setIsPlaylistEditable(true);
    } else {
      setIsPlaylistEditable(false);
    }
  }, [state.userName, playlist]);

  async function execute(playlistId: string) {
    if (accessToken) {
      const { playlistRes, tracks } = await fetchPlayableItems(accessToken, playlistId, type);
      setPlaylist(playlistRes);
      if (tracks.length > 0) {
        setTracks(tracks);
      } else {
        setTracks([]);
      }
    }
  }

  useEffect(() => {
    execute(playlistId);
    dispatch({
      type: reducerActionTypes.SET_CHECKED_TRACKS,
      payload: [],
    });
    // setEdit(false);
  }, [playlistId, type, accessToken]);

  const handleTrackClick = (track: Track) => {
    handlePlayTrack(tracks, track, dispatch);
  };

  const handleDelete = async () => {
    try {
      console.log('playlist.id ', playlist.id);
      console.log('playlist.snapshot_id ', playlist.snapshot_id);
      // console.log("playlist.snapshot_id ",playlist.snapshot_id);
      const removed = await removeFromPlaylist(accessToken, playlist.id, checkedTracks, playlist.snapshot_id);
      console.log('removed ', removed);

      await execute(playlistId);
      setEdit(false);
      dispatch({
        type: reducerActionTypes.SET_CHECKED_TRACKS,
        payload: [],
      });
    } catch (error) {
      console.log('yuda error ', error);
    }
  };

  const handleAddToPlaylist = async (playlist: Playlist) => {
    const body = {
      uris: checkedTracks.map((track) => track.uri),
      position: 0,
    };

    try {
      const added = await addTracksToPlaylist(accessToken, playlist.id, body);
      const res = await added.json();
      if (res?.snapshot_id) {
        setEdit(false);
        dispatch({
          type: reducerActionTypes.SET_CHECKED_TRACKS,
          payload: [],
        });
      }
    } catch (error) {
      console.log('yuda error ', error);
    }
  };

  async function handleAddTrack(track: Track) {
    const body = {
      uris: [track.uri],
      position: 0,
    };
    const addToPlaylistRes = await addTracksToPlaylist(accessToken, playlistId, body);
    if (addToPlaylistRes.status === 200) {
      execute(playlistId);
    }
    return addToPlaylistRes;
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setSourceIndex(index);
    setDraggedItem(tracks[index]);
    dispatch({
      type: reducerActionTypes.SET_IS_DRAGGING,
      payload: true,
    });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.parentNode?.toString() || '');
    setTimeout(() => {
      if (e?.currentTarget?.classList) {
        e.currentTarget.classList.add('dragging');
      }
    }, 0);
  };

  const onDragOver = (index: number) => {
    setDestinationIndex(index);
    if (!draggedItem) return;

    const draggedOverItem = tracks[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let itemsCopy = tracks.filter((track) => track !== draggedItem);
    itemsCopy.splice(index, 0, draggedItem);

    setTracks(itemsCopy);
  };

  const onDrop = () => {
    const body = {
      range_start: sourceIndex,
      insert_before: sourceIndex < destinationIndex ? destinationIndex + 1 : destinationIndex,
      range_length: 1,
    };
    console.log('body ', body);

    setIsUpdating(true);
    updatePlaylistOrder(accessToken, playlistId, body)
      .then((res) => {
        console.log('res ', res);
      })
      .catch((err) => {
        console.log('err ', err);
      })
      .finally(() => {
        setIsUpdating(false);
      });
    dispatch({
      type: reducerActionTypes.SET_IS_DRAGGING,
      payload: false,
    });
  };

  return (
    <>
      <PlaylistHeader total={properTracks.length} setPlaylist={setPlaylist} rgb={rgb} isPlaylistEditable={isPlaylistEditable} edit={edit} setEdit={setEdit} playlist={playlist} />
      <Paper
        elevation={0}
        square
        sx={{
          minHeight: '90vh',
          background: 'transparent',
        }}>
        {checkedTracks.length > 0 && <CheckedTracksActions isPlaylistEditable={isPlaylistEditable} handleDelete={handleDelete} handleAddToPlaylist={handleAddToPlaylist} />}

        <List
          square
          elevation={0}
          style={{
            background: 'transparent',
            borderRadius: '0px',
          }}
          component={Paper}>
          {properTracks.map((track, index) => {
            const isChecked = !!checkedTracks.find((item) => item.uri === track.uri);
            return (
              <React.Fragment key={index}>
                <List
                  onDragOver={(e) => {
                    e.preventDefault();
                    onDragOver(index);
                  }}
                  onDrop={(e) => {
                    onDrop();
                  }}
                  className="list-item"
                  onClick={() => {
                    handleTrackClick(track);
                  }}
                  key={track?.id}
                  sx={{
                    height: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0',
                  }}>
                  <ListItemButton
                    sx={{
                      position: 'relative',
                      '&:hover .MuiCheckbox-root': {
                        visibility: 'visible',
                      },
                    }}
                    draggable={isPlaylistEditable}
                    onDragStart={(e) => onDragStart(e, index)}
                    className="draggable"
                    disableRipple>
                    <ListItem sx={{ flex: 1 }} role="none">
                      {index + 1}
                    </ListItem>
                    {track?.album?.images[0]?.url && (
                      <ListItem sx={{ flex: 2 }} role="none">
                        <Avatar src={track?.album?.images[0]?.url} />
                      </ListItem>
                    )}
                    <ListItem sx={{ flex: 20, display: 'flex', flexDirection: 'column', alignItems:"start"}} role="none">
                      <Typography>{track?.name}</Typography>
                      <Typography variant="body2" gutterBottom>
                        {track?.artists.map((artist: Artist) => artist.name).join(', ')}
                      </Typography>
                    </ListItem>
                    {/* <ListItem sx={{ flex: 20 }} role="none">
                     <Typography> {track?.name}</Typography>
                    </ListItem> */}
                    <ListItem sx={{ flex: 12 }} role="none">
                      album
                    </ListItem>
                    <ListItem sx={{ flex: 6 }} role="none">
                      {track?.album.release_date}
                    </ListItem>
                    <ListItem sx={{ flex: 3 }} role="none">
                      {msToMinutesAndSeconds(track?.duration_ms)}
                    </ListItem>
                    <ListItem
                      sx={{
                        flex: 3,
                        visibility: isChecked ? 'visible' : 'hidden',
                      }}
                      role="none">
                      <Checkbox checked={isChecked} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCheckboxToggle(e, track, dispatch, checkedTracks)} />
                    </ListItem>
                  </ListItemButton>
                </List>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>

        <Box margin={'auto'} height={200} width={500} my={4} display="flex" alignItems="center" justifyContent="center" gap={4} p={2}>
          <SearchToAdd playlistTracks={tracks} handleAddTrack={handleAddTrack} setTracks={setTracks} />
        </Box>
      </Paper>
    </>
  );
};

export default ReorderListPlaylist;
