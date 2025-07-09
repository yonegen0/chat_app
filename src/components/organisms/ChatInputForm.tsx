import React, { FormEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box, TextField, Button, styled } from '@mui/material';

type ChatInputFormProps = {
  message: string;
  isSendButtonDisabled: boolean;
  onMessageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage?: (event: FormEvent) => void;
};

export const StyledBox = styled(Box)({
  display : "flex",
  gap: 1,
  component: "form",
});
export const StyledTextField = styled(TextField)({
  p : 1,
});
export const StyledButton = styled(Button)({
  type: "submit",
  variant: "contained",
  color: "primary",
  whiteSpace:"nowrap"
});

// メッセージ入力と送信ボタン
export const ChatInputForm = (props: ChatInputFormProps) => {
  return (
    <StyledBox  onSubmit={props.onSendMessage}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="メッセージを入力してください"
        value={props.message}
        onChange={props.onMessageChange}
      />
      <StyledButton
        endIcon={<SendIcon />}
        disabled={props.isSendButtonDisabled}
      >
        送信
      </StyledButton>
    </StyledBox>
  );
};