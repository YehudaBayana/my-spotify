import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const LibrarySearch = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleExpandClick = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setSearchText('');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleBlur = () => {
    if (!searchText) {
      handleCollapse();
    }
  };

  return (
    <Paper
    elevation={0}
    square
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: expanded ? '100%' : '40px',
        // width: expanded ? '300px' : '40px',
        transition: 'width 0.3s ease-in-out',
        padding: '2px 4px',
        boxShadow: expanded ? '0px 3px 5px rgba(0,0,0,0.2)' : 'none'
      }}
    >
      <IconButton onClick={handleExpandClick}>
        <SearchIcon />
      </IconButton>
      {expanded && (
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Library Search..."
          value={searchText}
          onChange={handleSearchChange}
          onBlur={handleBlur}
          autoFocus
        />
      )}
      {expanded && (
        <IconButton onClick={handleCollapse}>
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default LibrarySearch;
