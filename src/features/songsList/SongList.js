import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import ReorderListPlaylist from './ReorderListPlaylist';
import ReorderListAlbum from './ReorderListAlbum';

export default function SongList() {
  const location = useLocation();
  const type = location.pathname.split('/').filter((item) => item)[0];
  const [edit, setEdit] = useState(false);
  return (
    <Paper elevation={0} sx={{ marginBottom: 8, width: '100%' }}>
      {type === 'playlist' ? <ReorderListPlaylist edit={edit} setEdit={setEdit} /> : <ReorderListAlbum />}
    </Paper>
  );
}
