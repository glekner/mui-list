import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List, { ListProps } from "@mui/material/List";

export type GenericListItem<T> = T & {
  descendants?: GenericListItem<T>[];
};

type GenericListProps<T> = {
  title?: string;
  items: GenericListItem<T>[];
  renderItem: (item: GenericListItem<T>) => React.ReactNode;
} & ListProps;

type GenericListComponent = <T>(props: GenericListProps<T>) => JSX.Element;

export const GenericList: GenericListComponent = ({
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
