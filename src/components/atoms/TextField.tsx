import React from 'react';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// type
type CustomTextFieldProps = {
  customWidth?: string | number;
  customBackgroundColor?: string;
  customTextColor?: string;
};

// styled
const StyledTextField = styled(MuiTextField)<{props: CustomTextFieldProps}>(({ props }) => ({
  ...(props.customWidth && { width: props.customWidth }),
  ...(props.customBackgroundColor && { backgroundColor: props.customBackgroundColor }),
  ...(props.customTextColor && { color: props.customTextColor }),
}));

// コンポーネント
export const TextField = ( props: CustomTextFieldProps) => {
  return <StyledTextField props={props} />;
};