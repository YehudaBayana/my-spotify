import { styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth, DRAWERHEIGHT } from "../constants";
import ListItemIcon from "@mui/material/ListItemIcon";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  ["@media (min-width:600px)"]: {
    minHeight: DRAWERHEIGHT,
  },
}));

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
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

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // ...(open && {
  //   ...openedMixin(theme),
  //   '& .MuiDrawer-paper': openedMixin(theme),
  // }),
  // ...(!open && {
  //   ...closedMixin(theme),
  //   '& .MuiDrawer-paper': closedMixin(theme),
  // }),
}));

export const StyledListItemIcon = styled(ListItemIcon)({
  width: "36px",
  height: "36px",
  minWidth: "unset",
  marginRight: "10px !important",
});
