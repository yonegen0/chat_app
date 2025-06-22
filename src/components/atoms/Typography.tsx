import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

// type
type CustomTypographyProps = {
  /** 表示するテキスト */
  label: string;
  /** Flexboxアイテムとしての配置 (クロス軸) */
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  /** テキストのフォントサイズ */
  fontSize?: string;
  /** 要素の内側余白 (padding) */
  p?: string; // Material-UIのsxプロパティでのpaddingの省略形
  /** 要素の角の丸み */
  borderRadius?: string;
  /** 要素の背景色 */
  backgroundColor?: string;
  /** 長い単語の改行方法 */
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
};

// styled
const StyledTypography = styled(MuiTypography)<{ props: CustomTypographyProps }>(({ props }) => ({
  alignSelf: props.alignSelf,
  fontSize: props.fontSize,
  padding: props.p,
  borderRadius: props.borderRadius,
  backgroundColor: props.backgroundColor,
  wordBreak: props.wordBreak,
}));

// コンポーネント
export const Typography = (props: CustomTypographyProps) => {
  return (
    <StyledTypography
      props={props}
      >
      {props.label}
    </StyledTypography>);
};