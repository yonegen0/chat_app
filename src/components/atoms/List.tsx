import React from 'react';
import MuiList, { ListProps as MuiListProps } from '@mui/material/List';
import { styled } from '@mui/material/styles';

// type
type CustomListProps = Omit<MuiListProps, 'sx'> & {
  customWidth?: string | number;
  customHeight?: string | number;
};

// styled
const StyledList = styled(MuiList)<CustomListProps>(({ customWidth, customHeight }) => ({
  ...(customWidth && { width: customWidth }),
  ...(customHeight && { height: customHeight }),
}));

// コンポーネント
export const List: React.FC<CustomListProps> = (props) => {
  return <StyledList {...props} />;
};