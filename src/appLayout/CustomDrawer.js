import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { drawerWidth, DRAWERHEIGHT } from "../constants";
import { useTheme } from "@mui/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  ["@media (min-width:600px)"]: {
    minHeight: DRAWERHEIGHT,
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)({
  width: "36px",
  height: "36px",
  minWidth: "unset",
  marginRight: "10px !important",
});

const CustomDrawer = ({
  open,
  handleDrawerClose,
  links,
  userPlaylists,
  userAlbums,
}) => {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <h2>Yuda music</h2>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {links.map((obj) => (
          <Link
            key={obj.text}
            style={{ textDecoration: "none", color: "black" }}
            to={obj.path}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {obj.icon}
                </ListItemIcon>
                <ListItemText
                  primary={obj.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Your Library
      </Typography>
      <Divider />
      <List>
        {[...userPlaylists, ...userAlbums].map((item) => (
          <Link
            key={item.id}
            style={{ textDecoration: "none", color: "black" }}
            to={`/${item.type}/${item.id}`}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  backgroundColor: "lightgrey",
                }}
              >
                <StyledListItemIcon
                  sx={{
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.images[item.type === "playlist" ? 0 : 2].url}
                    alt="Folder Icon"
                  />
                </StyledListItemIcon>
                <ListItemText
                  secondary={item.type}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
