import React from 'react';
import { List as MuiList, ListProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomListProps = ListProps & {
  children: React.ReactNode;
  p?: number | string;
};

// styled
const StyledList = styled(MuiList)<{ props: CustomListProps }>(({ props }) => ({
  ...(props.p && { padding: props.p }),
}));

// コンポーネント
export const List = (props: CustomListProps) => {
  return <StyledList props={props}>{props.children}</StyledList>;
};