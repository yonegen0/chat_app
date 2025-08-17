import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RoomMenuItem }  from '../molecules/RoomMenuItem';
type RoomListMenuProps = {
  // メニューが開いているか
  open: boolean;
  // メニュー表示の基準となるHTML要素
  anchorEl: null | HTMLElement;
  // メニューを閉じるアクション
  onClose: () => void;
  // ルーム名のリスト
  rooms: string[];
  // 現在選択されているルームの名前
  currentRoom: string;
  // ルームが変更された時のアクション
  onRoomChange: (roomName: string) => void;
  // 削除確認ダイアログを開くアクション
  onOpenDeleteConfirmDialog: (roomName: string) => void;
  // ルーム追加ボタンを表示するか
  showAddRoomButton?: boolean;
  // ルーム作成ダイアログを開くアクション
  onOpenCreateRoomDialog?: () => void;
};

// ルーム一覧メニュー
export const RoomListMenu = (props: RoomListMenuProps) => {
  return (
    <Menu
      id="room-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="room-menu-button"
    >
      {props.showAddRoomButton && (
        <MenuItem onClick={props.onOpenCreateRoomDialog}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>新しいルームを作成</ListItemText>
        </MenuItem>
      )}
      {props.rooms.map((room) => (
        <RoomMenuItem
          key={room}
          roomName={room}
          isSelected={room === props.currentRoom}
          onSelect={() => props.onRoomChange(room)}
          onDelete={() => props.onOpenDeleteConfirmDialog(room)}
          isGeneral={room === 'General'}
        />
      ))}
    </Menu>
  );
}