import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
export type CustomButtonProps = {
  /** ラベル */
  label: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 非活性 */
  disabled?: boolean;
  /** クリック処理 */
  onClick?: () => void;
};

// styled
const StyledButton = styled(MuiButton)<{ backgroundColor?: string }>(({ backgroundColor }) => ({
  backgroundColor: backgroundColor,
}));

// コンポーネント
export const Button = (props: CustomButtonProps) => {
  return <StyledButton
    // size={props.size?? 'small'}
    type="submit"
    variant="contained"
    color="primary"
    // endIcon={}
    disabled={props.disabled?? false}
    >{props.label}
    </StyledButton>
};