import React, { FormEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '../atoms/Box';
import { TextField } from '../atoms/TextField';
import { Button } from '../atoms/Button';

type ChatInputFormProps = {
  message: string;
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (event: FormEvent) => void;
  isSendButtonDisabled: boolean;
};

// メッセージ入力と送信ボタン
export const ChatInputForm = ({
  message,
  onMessageChange,
  onSendMessage,
  isSendButtonDisabled,
}: ChatInputFormProps) => {
  return (
    <Box component="form" onSubmit={onSendMessage} display="flex" gap={1}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="メッセージを入力してください"
        value={message}
        onChange={onMessageChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        disabled={isSendButtonDisabled}
        whiteSpace="nowrap"
      >
        送信
      </Button>
    </Box>
  );
};