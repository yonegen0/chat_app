import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export type DeleteRoomDialogProps = {
  // ダイアログ開閉
  open: boolean;
  // ルーム名
  value: string;
  // クローズアクション
  onClose: () => void;
  // deleteアクション
  onDelete: () => void;
};

// ルーム削除ダイアログ
export const DeleteRoomDialog = (props: DeleteRoomDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>ルームを削除しますか？</DialogTitle>
      <DialogContent>
        <Typography>本当にルーム「{props.value}」を削除してもよろしいですか？この操作は元に戻せません。</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>キャンセル</Button>
        <Button onClick={props.onDelete} color="error">削除</Button>
      </DialogActions>
    </Dialog>
  );
}