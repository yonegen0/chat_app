import React from 'react';
import MuiContainer from '@mui/material/Container';
import { styled } from '@mui/material/styles';

// type
type CustomContainerProps = {
  customBackgroundColor?: string;
};

// styled
const StyledContainer = styled(MuiContainer)<{props: CustomContainerProps}>(({ props }) => ({
  ...(props.customBackgroundColor && { backgroundColor: props.customBackgroundColor }),
}));

// コンポーネント
export const Container = ( props: CustomContainerProps) => {
  return <StyledContainer props={props} />;
};