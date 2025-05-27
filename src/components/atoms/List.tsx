import React from 'react';
import MuiList from '@mui/material/List';
import { styled } from '@mui/material/styles';

// type
type CustomListProps = {
  customWidth?: string | number;
  customHeight?: string | number;
};

// styled
const StyledList = styled(MuiList)<{props: CustomListProps}>(({ props }) => ({
  ...(props.customWidth && { width: props.customWidth }),
  ...(props.customHeight && { height: props.customHeight }),
}));

// コンポーネント
export const List = ( props: CustomListProps) => {
  return <StyledList props={props} />;
};