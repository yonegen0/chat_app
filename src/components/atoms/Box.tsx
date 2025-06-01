import React from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Property } from 'csstype'; 

// type
type CustomBoxProps = BoxProps & {
  display?: Property.Display;
  gap?: Property.Gap | number;
  mb?: Property.MarginBottom | number;
  alignItems?: Property.AlignItems;
  flexDirection?: Property.FlexDirection;
};

// styled
const StyledBox = styled(MuiBox)<{props: CustomBoxProps}>(({ theme, props }) => ({
  ...(props.display && { display: props.display }),
  ...(props.gap !== undefined && { gap: typeof props.gap === 'number' ? theme.spacing(props.gap) : props.gap }),
  ...(props.mb !== undefined && { marginBottom: typeof props.mb === 'number' ? theme.spacing(props.mb) : props.mb }),
  ...(props.alignItems && { alignItems: props.alignItems }),
  ...(props.flexDirection && { flexDirection: props.flexDirection }),
}));

// コンポーネント
export const Box = (props: CustomBoxProps) => {
  return <StyledBox props={props} />;
};