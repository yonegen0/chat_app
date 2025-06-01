import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
};

// styled
const StyledButton = styled(MuiButton)<{ props: CustomButtonProps }>(({ props }) => ({
  ...(props.whiteSpace && { whiteSpace: props.whiteSpace }),
}));

// コンポーネント
export const Button = (props: CustomButtonProps) => {
  return <StyledButton props={props}>{props.children}</StyledButton>;
};