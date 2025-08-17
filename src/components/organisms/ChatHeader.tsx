import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import {RoomListMenu} from '@/components/organisms/RoomListMenu';
import {RoomAddButton} from '@/components/atoms/RoomAddButton';
import {CreateRoomDialog, type CreateRoomDialogProps} from '@/components/atoms/CreateRoomDialog';
import {RoomMenuButton} from '@/components/atoms/RoomMenuButton';
import {DeleteRoomDialog, type DeleteRoomDialogProps} from '@/components/atoms/DeleteRoomDialog';

export type ChatHeaderProps = {
  // 現在選択されているルーム名
  currentRoom: string;
  // ルームの全リスト
  rooms: string[];
  // ルーム変更時のアクション
  onRoomChange: (roomName: string) => void;
  // ルーム作成ダイアログを開くアクション
  onOpenCreateRoomDialog: () => void;
  // 削除確認ダイアログを開くアクション
  onOpenDeleteConfirmDialog: (roomName: string) => void;

  // ルーム作成ダイアログ関連
  createRoomDialogProps: CreateRoomDialogProps;
  // ルーム削除ダイアログ関連
  deleteRoomDialogProps: DeleteRoomDialogProps;
};

// ヘッダー全体
export const ChatHeader = (props: ChatHeaderProps) => {
  // ルームメニューのアンカー要素を管理（メニュー表示位置の基準）
  const [roomAnchorEl, setRoomAnchorEl] = useState<null | HTMLElement>(null);
  // ルームメニューが開いているか
  const roomOpen = Boolean(roomAnchorEl);
  // ルーム追加メニューのアンカー要素を管理
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null);
  // ルーム追加メニューが開いているか
  const addOpen = Boolean(addAnchorEl);

  // ルームメニューを開くアクション
  const handleOpenRoomMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRoomAnchorEl(event.currentTarget);
  };
  // ルームメニューを閉じるアクション
  const handleCloseRoomMenu = () => {
    setRoomAnchorEl(null);
  };

  // ルーム追加メニューを開くアクション
  const handleOpenAddMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddAnchorEl(event.currentTarget);
  };
  // ルーム追加メニューを閉じるアクション
  const handleCloseAddMenu = () => {
    setAddAnchorEl(null);
  };

  // ルーム変更とメニューを閉じるアクションをまとめたもの
  const handleRoomChangeAndClose = (roomName: string) => {
    props.onRoomChange(roomName);
    handleCloseRoomMenu();
  };

  // ルーム作成ダイアログを開き、メニューを閉じるアクションをまとめたもの
  const handleOpenCreateDialogAndCloseMenu = () => {
    props.onOpenCreateRoomDialog();
    handleCloseAddMenu();
  };

  // ルーム削除ダイアログを開き、メニューを閉じるアクションをまとめたもの
  const handleOpenDeleteDialogAndCloseMenu = (roomName: string) => {
    props.onOpenDeleteConfirmDialog(roomName);
    handleCloseRoomMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <RoomMenuButton onClick={handleOpenRoomMenu} />
          <RoomListMenu
            anchorEl={roomAnchorEl}
            open={roomOpen}
            onClose={handleCloseRoomMenu}
            rooms={props.rooms}
            currentRoom={props.currentRoom}
            onRoomChange={handleRoomChangeAndClose}
            onOpenDeleteConfirmDialog={handleOpenDeleteDialogAndCloseMenu}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            チャットアプリ - 現在のルーム: {props.currentRoom}
          </Typography>
          <RoomAddButton onClick={handleOpenAddMenu} />
          <RoomListMenu
            anchorEl={addAnchorEl}
            open={addOpen}
            onClose={handleCloseAddMenu}
            rooms={props.rooms}
            currentRoom={props.currentRoom}
            onRoomChange={handleRoomChangeAndClose}
            onOpenDeleteConfirmDialog={handleOpenDeleteDialogAndCloseMenu}
            showAddRoomButton
            onOpenCreateRoomDialog={handleOpenCreateDialogAndCloseMenu}
          />
        </Toolbar>
      </AppBar>

      <CreateRoomDialog
        open={props.createRoomDialogProps.open}
        onClose={props.createRoomDialogProps.onClose}
        value={props.createRoomDialogProps.value}
        onChange={props.createRoomDialogProps.onChange}
        onCreateRoom={props.createRoomDialogProps.onCreateRoom}
      />

      <DeleteRoomDialog
        open={props.deleteRoomDialogProps.open}
        onClose={props.deleteRoomDialogProps.onClose}
        value={props.deleteRoomDialogProps.value}
        onDelete={props.deleteRoomDialogProps.onDelete}
      />
    </Box>
  );
}