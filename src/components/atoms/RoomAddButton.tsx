import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type RoomAddButtonProps = {
  // クリックアクション
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// ルーム作成メニューを開くボタン
export const RoomAddButton = (props: RoomAddButtonProps) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="ルーム操作メニュー"
      onClick={props.onClick}
      id="room-menu-button"
      aria-haspopup="true"
      sx={{ mr: 2 }}
    >
      <AddIcon />
    </IconButton>
  );
}