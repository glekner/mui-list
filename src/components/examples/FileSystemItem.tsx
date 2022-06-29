import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { GenericListItem } from "../GenericList";

export type FileSystemItemType = GenericListItem<{ name: string }>;

export const FileSystemItem: React.FC<FileSystemItemType> = ({
  name,
  descendants,
}) => {
  const [open, setOpen] = React.useState(false);
  const isFolder = descendants && descendants.length > 0;

  const handleClick = () => {
    setOpen(!open);
    console.log("clicked item", name);
  };

  return (
    <React.Fragment key={name}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText primary={name} />
        {isFolder && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {descendants?.map((child) => (
          <List key={child.name} component="div" disablePadding sx={{ pl: 4 }}>
            <FileSystemItem {...child} />
          </List>
        ))}
      </Collapse>
    </React.Fragment>
  );
};
