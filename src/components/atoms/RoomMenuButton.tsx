import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

type RoomMenuButtonProps = {
  // クリックアクション
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// 一覧を開くボタン
export const RoomMenuButton = (props: RoomMenuButtonProps) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="ルーム一覧メニュー"
      onClick={props.onClick}
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
}