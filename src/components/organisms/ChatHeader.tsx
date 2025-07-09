import React from 'react';
import { Typography } from '@mui/material';

export type ChatHeaderProps = {
  title: string;
};

// ヘッダ
export const ChatHeader = (props: ChatHeaderProps) => {
  return (
    <Typography variant="h5" component="h1" gutterBottom align="center">
      {props.title}
    </Typography>
  );
};