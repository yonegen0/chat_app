import React from 'react';
import MuiListItem, { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

// type
type CustomListItemProps = Omit<MuiListItemProps, 'sx'> & {
  customBackgroundColor?: string;
};

// styled
const StyledListItem = styled(MuiListItem)<CustomListItemProps>(({ customBackgroundColor }) => ({
  ...(customBackgroundColor && { backgroundColor: customBackgroundColor }),
}));

// コンポーネント
export const ListItem: React.FC<CustomListItemProps> = (props) => {
  return <StyledListItem {...props} />;
};