import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; 
import { Property } from 'csstype'; 

// type
type CustomPaperProps = PaperProps & {
  children: React.ReactNode;
  p?: number | string; 
  display?: Property.Display; 
  flexDirection?: Property.FlexDirection; 
  height?: string; 
  mb?: number | string; 
  backgroundColor?: string; 
  overflowY?: Property.OverflowY; 
  flexGrow?: Property.FlexGrow; 
};


// styled
const StyledPaper = styled(MuiPaper)<{ props: CustomPaperProps }>(({ theme, props }) => ({
  ...(props.p !== undefined && { padding: typeof props.p === 'number' ? theme.spacing(props.p) : props.p }),
  ...(props.display && { display: props.display }),
  ...(props.flexDirection && { flexDirection: props.flexDirection }),
  ...(props.height && { height: props.height }),
  ...(props.mb !== undefined && { marginBottom: typeof props.mb === 'number' ? theme.spacing(props.mb) : props.mb }),
  ...(props.backgroundColor && { backgroundColor: props.backgroundColor }),
  ...(props.overflowY && { overflowY: props.overflowY }),
  ...(props.flexGrow !== undefined && { flexGrow: props.flexGrow }),
}));


// コンポーネント
export const Paper = (props: CustomPaperProps) => {
  return <StyledPaper props={props}>{props.children}</StyledPaper>;
};