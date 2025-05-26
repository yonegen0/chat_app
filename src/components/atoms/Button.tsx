import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// type
type CustomButtonProps = Omit<MuiButtonProps, 'sx'> & {
  customWidth?: string | number;
  customBackgroundColor?: string;
  customTextColor?: string;
};

// styled
const StyledButton = styled(MuiButton)<CustomButtonProps>(({ customWidth, customBackgroundColor, customTextColor, theme }) => ({
  ...(customWidth && { width: customWidth }),
  ...(customBackgroundColor && { backgroundColor: customBackgroundColor }),
  ...(customTextColor && { color: customTextColor }),
}));

// コンポーネント
export const Button: React.FC<CustomButtonProps> = (props) => {
  return <StyledButton {...props} />;
};