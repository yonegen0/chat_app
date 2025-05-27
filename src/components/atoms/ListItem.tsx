import React from 'react';
import MuiListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

// type
type CustomListItemProps = {
  customBackgroundColor?: string;
};

// styled
const StyledListItem = styled(MuiListItem)<{props: CustomListItemProps}>(({ props }) => ({
  ...(props.customBackgroundColor && { backgroundColor: props.customBackgroundColor }),
}));

// コンポーネント
export const ListItem = ( props: CustomListItemProps) => {
  return <StyledListItem props={props} />;
};