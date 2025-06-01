import React from 'react';
import { Container as MuiContainer, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomContainerProps = ContainerProps & {
  children: React.ReactNode;
  mt?: number | string;
};

// styled
const StyledContainer = styled(MuiContainer)<{ props: CustomContainerProps }>(({ props }) => ({
  ...(props.mt && { marginTop: props.mt }),
}));

// コンポーネント
export const Container = (props: CustomContainerProps) => {
  return <StyledContainer props={props}>{props.children}</StyledContainer>;
};