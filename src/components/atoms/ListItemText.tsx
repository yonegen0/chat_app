import React from 'react';
import MuiListItemText, { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

// type
type CustomListItemTextProps = Omit<MuiListItemTextProps, 'sx'> & {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

// styled
const StyledListItemText = styled(MuiListItemText)<CustomListItemTextProps>(({ theme, primaryTextColor, secondaryTextColor }) => ({
  '& .MuiListItemText-primary': {
    ...(primaryTextColor && { color: primaryTextColor }),
  },
  '& .MuiListItemText-secondary': {
    ...(secondaryTextColor && { color: secondaryTextColor }),
  },
}));

// コンポーネント
export const ListItemText: React.FC<CustomListItemTextProps> = (props) => {
  return <StyledListItemText {...props} />;
};