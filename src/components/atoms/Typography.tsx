import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomTypographyProps = TypographyProps & {
  children: React.ReactNode;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  fontSize?: number | string;
  p?: number | string;
  borderRadius?: number | string;
  maxWidth?: number | string;
  backgroundColor?: string;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
};

// styled
const StyledTypography = styled(MuiTypography)<{ props: CustomTypographyProps }>(({ props }) => ({
  ...(props.alignSelf && { alignSelf: props.alignSelf }),
  ...(props.fontSize && { fontSize: props.fontSize }),
  ...(props.p && { padding: props.p }),
  ...(props.borderRadius && { borderRadius: props.borderRadius }),
  ...(props.maxWidth && { maxWidth: props.maxWidth }),
  ...(props.backgroundColor && { backgroundColor: props.backgroundColor }),
  ...(props.wordBreak && { wordBreak: props.wordBreak }),
}));

// コンポーネント
export const Typography = (props: CustomTypographyProps) => {
  return <StyledTypography props={props}>{props.children}</StyledTypography>;
};