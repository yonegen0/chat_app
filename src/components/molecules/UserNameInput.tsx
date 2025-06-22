import React from 'react';
import { Box, TextField } from '@mui/material';
import { Typography } from '../atoms/Typography';

type UserNameInputProps = {
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// ユーザー名入力フィールドとラベル
export const UserNameInput = ({ username, onUsernameChange }: UserNameInputProps) => {
  return (
    <Box mb={2} display="flex" alignItems="center" gap={1}>
      <Typography label='名前:'/>
      <TextField
        variant="outlined"
        size="small"
        value={username}
        onChange={onUsernameChange}
      />
    </Box>
  );
};