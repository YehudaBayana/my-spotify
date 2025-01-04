import React, { ReactNode, MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface MenuOption {
  label: string;
  action: () => void;
}

interface RightClickMenuProps {
  children: ReactNode;
  menuOptions: MenuOption[];
  contextMenu: { mouseX: number; mouseY: number } | null;  // New prop for context menu state
  setContextMenu: React.Dispatch<React.SetStateAction<{ mouseX: number; mouseY: number } | null>>; // New prop for context menu setter
}

const RightClickMenu: React.FC<RightClickMenuProps> = ({
  children,
  menuOptions,
  contextMenu,
  setContextMenu,
}) => {
  

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.action();
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default RightClickMenu;
