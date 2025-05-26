import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// type
type CustomTextFieldProps = Omit<MuiTextFieldProps, 'sx'> & {
  customWidth?: string | number;
  customBackgroundColor?: string;
  customTextColor?: string;
};

// styled
const StyledTextField = styled(MuiTextField)<CustomTextFieldProps>(({ customWidth, customBackgroundColor, customTextColor }) => ({
  ...(customWidth && { width: customWidth }),
  ...(customBackgroundColor && { backgroundColor: customBackgroundColor }),
  ...(customTextColor && { color: customTextColor }),
}));

// コンポーネント
export const TextField: React.FC<CustomTextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};