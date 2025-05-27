import React from 'react';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// type
type CustomTypographyProps = {
  customTextColor?: string;
  customFontSize?: string | number;
};

// styled
const StyledTypography = styled(MuiTypography)<{props: CustomTypographyProps}>(({ props }) => ({
  ...(props.customTextColor && { color: props.customTextColor }),
  ...(props.customFontSize && { fontSize: props.customFontSize }),
}));

// コンポーネント
export const Typography = ( props: CustomTypographyProps) => {
  return <StyledTypography props={props} />;
};