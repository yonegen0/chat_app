import React from 'react';
import { ListItem as MuiListItem, ListItemProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomListItemProps = ListItemProps & {
  children: React.ReactNode;
  mb?: number | string;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
};

// styled
const StyledListItem = styled(MuiListItem)<{ props: CustomListItemProps }>(({ props }) => ({
  ...(props.mb && { marginBottom: props.mb }),
  ...(props.justifyContent && { justifyContent: props.justifyContent }),
}));

// コンポーネント
export const ListItem = (props: CustomListItemProps) => {
  return <StyledListItem props={props}>{props.children}</StyledListItem>;
};