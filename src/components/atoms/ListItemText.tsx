import React from 'react';
import { ListItemText as MuiListItemText, ListItemTextProps as MuiListItemTextProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomListItemTextProps = MuiListItemTextProps & {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

// styled
const StyledListItemText = styled(MuiListItemText)<{ props: CustomListItemTextProps }>(({ props }) => ({
  '& .MuiListItemText-primary': {
    ...(props.primaryTextColor && { color: props.primaryTextColor }),
  },
  '& .MuiListItemText-secondary': {
    ...(props.secondaryTextColor && { color: props.secondaryTextColor }),
  },
}));

// コンポーネント
export const ListItemText = (props: CustomListItemTextProps) => {
  return <StyledListItemText props={props} />;
};