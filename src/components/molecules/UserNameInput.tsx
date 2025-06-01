import React from 'react';
import { Box } from '../atoms/Box';
import { Typography } from '../atoms/Typography';
import { TextField } from '../atoms/TextField';

type UserNameInputProps = {
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// ユーザー名入力フィールドとラベル
export const UserNameInput = ({ username, onUsernameChange }: UserNameInputProps) => {
  return (
    <Box mb={2} display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">名前:</Typography>
      <TextField
        variant="outlined"
        size="small"
        value={username}
        onChange={onUsernameChange}
        flexGrow={1}
      />
    </Box>
  );
};