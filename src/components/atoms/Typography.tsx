import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// type
type CustomTypographyProps = Omit<MuiTypographyProps, 'sx'> & {
  customTextColor?: string;
  customFontSize?: string | number;
};

// styled
const StyledTypography = styled(MuiTypography)<CustomTypographyProps>(({ customTextColor, customFontSize }) => ({
  ...(customTextColor && { color: customTextColor }),
  ...(customFontSize && { fontSize: customFontSize }),
}));

// コンポーネント
export const Typography: React.FC<CustomTypographyProps> = (props) => {
  return <StyledTypography {...props} />;
};