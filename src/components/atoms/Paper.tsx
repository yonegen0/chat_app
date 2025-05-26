import React from 'react';
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// type
type CustomPaperProps = Omit<MuiPaperProps, 'sx'> & {
  customBackgroundColor?: string;
  customBorderRadius?: string | number;
};

// styled
const StyledPaper = styled(MuiPaper)<CustomPaperProps>(({ customBackgroundColor, customBorderRadius }) => ({
  ...(customBackgroundColor && { backgroundColor: customBackgroundColor }),
  ...(customBorderRadius && { borderRadius: customBorderRadius }),
}));

// コンポーネント
export const Paper: React.FC<CustomPaperProps> = (props) => {
  return <StyledPaper {...props} />;
};