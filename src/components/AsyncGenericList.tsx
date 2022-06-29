import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List, { ListProps } from "@mui/material/List";
import { GenericListItem } from "./GenericList";

export type AsyncListItem<T> = GenericListItem<
  T & {
    url: string;
  }
>;

type AsyncGenericListProps<T extends { url: string }> = {
  title?: string;
  items: AsyncListItem<T>[];
  renderItem: (item: T) => React.ReactNode;
} & ListProps;

export type AsyncGenericListComponent = <T extends { url: string }>(
  props: AsyncGenericListProps<T>
) => JSX.Element;

export const AsyncGenericList: AsyncGenericListComponent = ({
  title,
  items,
  renderItem,
  ...props
}) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: "5px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ borderRadius: "5px" }}
        >
          {title || "List Items"}
        </ListSubheader>
      }
      {...props}
    >
      {items.map((item) => renderItem(item))}
    </List>
  );
};
