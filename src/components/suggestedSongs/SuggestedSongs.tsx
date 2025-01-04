import React, { useContext, useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageComponent from "../ImageComponent";
import AreYouSurePrompt from "../AreYouSurePrompt";
import RightClickMenu from "../../features/RightClickMenu";
import { Track } from '../../types/spotifyResponses';
import { StoreContext } from '../../context/ContextProvider';
import { handlePlayTrack } from '../../utils';
import { myColors } from "../../constants";

interface SuggestedSongsProps {
  title: string;
  tracks: Track[];
}

const SuggestedSongs: React.FC<SuggestedSongsProps> = ({ title, tracks }) => {
  const { dispatch } = useContext(StoreContext);
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleContextMenu = (event: React.MouseEvent<HTMLElement | SVGSVGElement>, track: Track) => {
    event.preventDefault();
    setSelectedTrack(track);
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleConfirmDelete = async () => {
    // Assuming a function to remove the track
    console.log("Delete track", selectedTrack);
    setOpenDialog(false);
    closeContextMenu();
  };

  return (
    <>
      <Typography variant="h6" sx={{ borderBottom: "2px solid white", marginBottom: "10px", fontWeight: "bold" }}>
        {title}
      </Typography>
      <AreYouSurePrompt
        open={openDialog}
        title="Confirm Deletion"
        description="Are you sure you want to delete this track from your library?"
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
      />
      <RightClickMenu
        menuOptions={[
          { label: "Remove from Library", action: () => setOpenDialog(true) },
          { label: "Add to a Playlist", action: () => console.log("Add to playlist") }
        ]}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
      >
        <List sx={{ marginBottom: "40px" }}>
          {tracks.map((track, index) => (
            <ListItem key={index} sx={{ borderBottom: "2px solid white", padding: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handlePlayTrack(tracks, track, dispatch)}>
                <ImageComponent width={34} alt={track.album.images[0].url} src={track.album.images[0].url} />
                <ListItemText
                  primary={track.name}
                  secondary={track.artists[0].name}
                  primaryTypographyProps={{ sx: { fontSize: "14px", marginLeft: "5px" } }}
                  secondaryTypographyProps={{ sx: { fontSize: "12px", marginLeft: "5px" } }}
                />
              </Box>
              <MoreHorizIcon
                sx={{ marginLeft: "auto", fontSize: "50px", cursor: "pointer", color: myColors.main }}
                onClick={(event) => handleContextMenu(event, track)}
              />
            </ListItem>
          ))}
        </List>
      </RightClickMenu>
    </>
  );
};

export default SuggestedSongs;
