import React from "react";
import { FileSystemItem, FileSystemItemType } from "./FileSystemItem";
import { GenericList } from "../GenericList";

const items: FileSystemItemType[] = [
  {
    name: "Inbox",
    descendants: [
      { name: "Starred", descendants: [] },
      { name: "Sent", descendants: [] },
      {
        name: "Drafts",
        descendants: [
          {
            name: "Draft 1",
            descendants: [{ name: "Draft 1.1", descendants: [] }],
          },
        ],
      },
    ],
  },
];

export const FileSystemExample: React.FC = () => {
  return (
    <GenericList
      title="File System"
      items={items}
      renderItem={FileSystemItem}
    />
  );
};
