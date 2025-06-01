import React from 'react';
import { Typography } from '../atoms/Typography';

// ヘッダ
export const ChatHeader = () => {
  return (
    <Typography variant="h5" component="h1" gutterBottom align="center">
      Chat App (チャットアプリ)
    </Typography>
  );
};