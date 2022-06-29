import React from "react";
import { FileSystemItemType, FileSystemList } from "../FileSystemList";

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
  return <FileSystemList folders={items} />;
};
