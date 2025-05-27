import React from 'react';
import MuiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// type
type CustomPaperProps = {
  customBackgroundColor?: string;
  customBorderRadius?: string | number;
};

// styled
const StyledPaper = styled(MuiPaper)<{props: CustomPaperProps}>(({ props }) => ({
  ...(props.customBackgroundColor && { backgroundColor: props.customBackgroundColor }),
  ...(props.customBorderRadius && { borderRadius: props.customBorderRadius }),
}));

// コンポーネント
export const Paper = ( props: CustomPaperProps) => {
  return <StyledPaper props={props} />;
};