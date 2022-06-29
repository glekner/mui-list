import React from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PhotoIcon from "@mui/icons-material/Photo";
import ArticleIcon from "@mui/icons-material/Article";
import Collapse from "@mui/material/Collapse";
import FolderIcon from "@mui/icons-material/Folder";

import { useFetch } from "../../hooks/useFetch";
import { GenericListItem } from "../GenericList";
import { delay } from "../../utils";

type FileType = "png" | "doc" | "dir";

export type AsyncListItem<T> = GenericListItem<
  T & {
    url: string;
  }
>;

export type AsyncFileSystemItemType = AsyncListItem<{
  name: string;
  filetype: FileType;
}>;

const fakeFetch = async (
  item: AsyncFileSystemItemType
): Promise<AsyncFileSystemItemType> => {
  await delay(1000);
  return Promise.resolve(item);
};

export const AsyncFileSystemItem: React.FC<AsyncFileSystemItemType> = (
  item
) => {
  const isFolder = item.descendants && item.descendants.length > 0;
  const [open, setOpen] = React.useState(false);
  const [data, isLoading, error] = useFetch<AsyncFileSystemItemType>(
    item,
    fakeFetch,
    {
      skip: !item.descendants || !open,
    }
  );

  const handleClick = () => {
    if (isFolder) {
      setOpen(!open);
    }
    console.log("clicked item", item);
  };

  React.useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const getItemIcon = (type: FileType) => {
    if (type === "png") {
      return <PhotoIcon />;
    }
    return <ArticleIcon />;
  };

  const getSecondaryText = (type: FileType) => {
    if (type === "dir") {
      return "";
    }
    if (type === "doc") {
      return "Document";
    }
    return "Image";
  };

  return (
    <React.Fragment key={item.name}>
      <ListItemButton onClick={handleClick} disabled={isLoading}>
        <ListItemIcon>
          {isFolder ? <FolderIcon /> : getItemIcon(item.filetype)}
        </ListItemIcon>
        <ListItemText
          primary={isLoading ? <CircularProgress size={20} /> : item.name}
          secondary={getSecondaryText(item.filetype)}
        />
        {isFolder && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        {data?.descendants?.map((child) => (
          <List key={child.name} component="div" disablePadding sx={{ pl: 4 }}>
            <AsyncFileSystemItem {...child} />
          </List>
        ))}
      </Collapse>
    </React.Fragment>
  );
};
