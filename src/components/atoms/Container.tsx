import React from 'react';
import MuiContainer, { ContainerProps as MuiContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

// type
type CustomContainerProps = Omit<MuiContainerProps, 'sx'> & {
  customBackgroundColor?: string;
};

// styled
const StyledContainer = styled(MuiContainer)<CustomContainerProps>(({ customBackgroundColor }) => ({
  ...(customBackgroundColor && { backgroundColor: customBackgroundColor }),
}));

// コンポーネント
export const Container: React.FC<CustomContainerProps> = (props) => {
  return <StyledContainer {...props} />;
};