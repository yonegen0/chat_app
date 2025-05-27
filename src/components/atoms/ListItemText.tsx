import React from 'react';
import MuiListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

// type
type CustomListItemTextProps = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

// styled
const StyledListItemText = styled(MuiListItemText)<{props: CustomListItemTextProps}>(({ props }) => ({
  '& .MuiListItemText-primary': {
    ...(props.primaryTextColor && { color: props.primaryTextColor }),
  },
  '& .MuiListItemText-secondary': {
    ...(props.secondaryTextColor && { color: props.secondaryTextColor }),
  },
}));

// コンポーネント
export const ListItemText = ( props: CustomListItemTextProps) => {
  return <StyledListItemText props={props} />;
};