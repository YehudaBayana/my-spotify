import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import ImageComponent from "../ImageComponent";
import RightClickMenu from "../../features/RightClickMenu";
import AreYouSurePrompt from "../AreYouSurePrompt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { myColors } from "../../constants";

interface Song {
  alt: string;
  src: string;
  title: string;
  artistName: string;
}

interface SuggestedSongsProps {
  title: string;
  songs: Song[];
}

const SuggestedSongs: React.FC<SuggestedSongsProps> = ({ title, songs }) => {
  const [menuOptions, setMenuOptions] = useState<
    Array<{ label: string; action: () => void }>
  >([]);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Adjust type as per your item structure
  const [openDialog, setOpenDialog] = useState(false);

  const handleContextMenu = (
    event: React.MouseEvent<SVGSVGElement | HTMLLIElement>,
    item: any
  ) => {
    event.preventDefault();
    setSelectedItem(item);
    setMenuOptions([
      { label: "remove from library", action: () => setOpenDialog(true) },
    ]);
  };

  const handleDeleteConfirm = async () => {
    // await removeFromLibraryHandler(selectedItem);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      {/* "The Most Played Songs" Section */}
      <Typography
        variant="h6"
        sx={{
          borderBottom: "2px solid white",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <AreYouSurePrompt
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
      />
      <RightClickMenu menuOptions={menuOptions}>
        <List sx={{ marginBottom: "40px" }}>
          {songs.map((song, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: "2px solid white", padding: 0 }}
              onContextMenu={(event) => handleContextMenu(event, song)}
            >
              <ImageComponent width={34} alt={song.alt} src={song.src} />
              <ListItemText
                primary={song.title}
                secondary={song.artistName}
                primaryTypographyProps={{
                  sx: { fontSize: "14px", marginLeft: "5px" },
                }}
                secondaryTypographyProps={{
                  sx: { fontSize: "12px", marginLeft: "5px" },
                }}
              />

              <MoreHorizIcon
                sx={{
                  marginLeft: "auto",
                  fontSize: "50px",
                  cursor: "pointer",
                  color: myColors.main,
                }}
                onClick={(event) => handleContextMenu(event, song)}
              />
            </ListItem>
          ))}
        </List>
      </RightClickMenu>
    </>
  );
};

export default SuggestedSongs;
