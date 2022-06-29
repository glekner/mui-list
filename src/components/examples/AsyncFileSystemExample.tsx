import React from "react";
import { AsyncGenericList } from "../AsyncGenericList";
import {
  AsyncFileSystemItem,
  AsyncFileSystemItemType,
} from "./AsyncFileSystemItem";

const items: AsyncFileSystemItemType[] = [
  {
    name: "Photos & Docs",
    url: "https://api.github.com/repos/mui-org/material-ui/issues",
    filetype: "dir",
    descendants: [
      { name: "Starred", descendants: [], url: "2", filetype: "png" },
      { name: "Pic 2", descendants: [], url: "3", filetype: "png" },
      {
        name: "Drafts",
        url: "7",
        filetype: "dir",
        descendants: [
          {
            name: "Draft 1",
            url: "5",
            filetype: "dir",
            descendants: [
              { name: "Draft 1.1", descendants: [], url: "4", filetype: "doc" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Starred",
    url: "starred",
    filetype: "dir",
    descendants: [
      { name: "Starred 1", descendants: [], url: "1", filetype: "png" },
      { name: "Starred 2", descendants: [], url: "2", filetype: "doc" },
    ],
  },
];

export const AsyncFileSystemListExample: React.FC = () => {
  return (
    <AsyncGenericList
      title="Async File System"
      items={items}
      renderItem={AsyncFileSystemItem}
    />
  );
};
