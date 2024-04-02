import { TextField } from '@mui/material'
import React from 'react'

const SearchInput = () => {
  return (
    <TextField
    size="small"
    id="filled-search"
    placeholder="Search field"
    type="search"
    variant="outlined"
    fullWidth
    sx={{
        backgroundColor: 'lightgray',
        borderRadius: '4px',
    }}
/>
  )
}

export default SearchInput