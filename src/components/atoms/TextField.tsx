import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomTextFieldProps = TextFieldProps & {
  flexGrow?: number;
};

// styled
const StyledTextField = styled(MuiTextField)<{ props: CustomTextFieldProps }>(({ props }) => ({
  ...(props.flexGrow && { flexGrow: props.flexGrow }),
}));

// コンポーネント
export const TextField = (props: CustomTextFieldProps) => {
  return <StyledTextField props={props} />;
};