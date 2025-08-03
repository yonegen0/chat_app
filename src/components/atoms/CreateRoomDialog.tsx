import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

type CreateRoomDialogProps = {
  // 
  open: boolean;
  //   
  value: string;
  //   
  onClose: () => void;
  //   
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   
  onCreateRoom: () => void;
};

export const CreateRoomDialog = (props: CreateRoomDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>新しいチャットルームを作成</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ルーム名"
          type="text"
          fullWidth
          variant="standard"
          value={props.value}
          onChange={props.onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>キャンセル</Button>
        <Button onClick={props.onCreateRoom} disabled={!props.value.trim()}>作成</Button>
      </DialogActions>
    </Dialog>
  );
}