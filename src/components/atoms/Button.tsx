import React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// type
type CustomButtonProps = {
  customWidth?: string | number;
  customBackgroundColor?: string;
  customTextColor?: string;
};

// styled
const StyledButton = styled(MuiButton)<{props: CustomButtonProps}>(({ props }) => ({
  ...(props.customWidth && { width: props.customWidth }),
  ...(props.customBackgroundColor && { backgroundColor: props.customBackgroundColor }),
  ...(props.customTextColor && { color: props.customTextColor }),
}));

// コンポーネント
export const Button = ( props: CustomButtonProps) => {
  return <StyledButton props={props} />;
};