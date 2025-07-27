'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { ChatTemplate } from '../../components/templates/ChatTemplate';
import { Message } from '../../types/index';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Dialog, // ルーム作成のためのダイアログを追加
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from '@mui/icons-material/Add';

// チャットアプリのページコンポーネント
export default function ChatPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ルーム作成ダイアログの状態管理
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  // 複数ルーム管理のためのステート
  const [rooms, setRooms] = useState<string[]>([]); // 利用可能なルームのリスト
  const [currentRoom, setCurrentRoom] = useState<string>('General'); // 現在のルーム
  // 各ルームのメッセージを保存するオブジェクト
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: Message[] }>({});

  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState<string>('');

  // 初期ロード時の処理 (ユーザー名とルーム、メッセージのロード)
  useEffect(() => {
    const storedUser = localStorage.getItem('chatUsername');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      const randomName = `Guest_${Math.floor(Math.random() * 10000)}`;
      setUsername(randomName);
      localStorage.setItem('chatUsername', randomName);
    }
  }, []);

  // 現在のルームのメッセージを ChatTemplate に渡すために抽出
  const currentMessages = roomMessages[currentRoom] || [];

  // メッセージ送信ハンドラ
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        user: username,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessageInput('');
    }
  };

  // ユーザー名変更ハンドラ
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    localStorage.setItem('chatUsername', e.target.value);
  };

  // ルーム切り替えハンドラ
  const handleRoomChange = (roomName: string) => {
    setCurrentRoom(roomName);
    handleClose(); // メニューを閉じる
  };

  // ルーム作成ダイアログを開く
  const handleOpenCreateRoomDialog = () => {
    setOpenCreateRoomDialog(true);
    handleClose(); // メニューを閉じる
  };

  // ルーム作成ダイアログを閉じる
  const handleCloseCreateRoomDialog = () => {
    setOpenCreateRoomDialog(false);
    setNewRoomName(''); // 入力フィールドをクリア
  };

  // ルーム作成の確定ハンドラ
  const handleCreateRoom = () => {
    if (newRoomName.trim() && !rooms.includes(newRoomName.trim())) {
      const trimmedRoomName = newRoomName.trim();
      setRooms((prevRooms) => [...prevRooms, trimmedRoomName]);
      setRoomMessages((prevRoomMessages) => ({
        ...prevRoomMessages,
        [trimmedRoomName]: [], // 新しいルームには空のメッセージ配列を割り当てる
      }));
      setCurrentRoom(trimmedRoomName); // 新しいルームに切り替える
      handleCloseCreateRoomDialog();
    } else {
      alert('ルーム名が無効か、すでに存在しています。');
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              チャットアプリ - 現在のルーム: {currentRoom}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="ルーム作成/選択メニュー" // ARIAラベルを更新
              onClick={handleClick}
              id="room-menu-button" // IDをより具体的に
              aria-controls={open ? "room-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ mr: 2 }}
            >
              <AddIcon />
            </IconButton>
            <Menu
              id="room-menu" // IDを更新
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-labelledby="room-menu-button" // ARIAラベルを更新
            >
              <MenuItem onClick={handleOpenCreateRoomDialog}>新しいルームを作成</MenuItem>
              {/* 既存のルームをマップして表示 */}
              {rooms.map((room) => (
                <MenuItem
                  key={room}
                  onClick={() => handleRoomChange(room)}
                  selected={room === currentRoom} // 現在のルームをハイライト
                >
                  {room}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit">ログアウト</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* ルーム作成ダイアログ */}
      <Dialog open={openCreateRoomDialog} onClose={handleCloseCreateRoomDialog}>
        <DialogTitle>新しいチャットルームを作成</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ルーム名"
            type="text"
            fullWidth
            variant="standard"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateRoomDialog}>キャンセル</Button>
          <Button onClick={handleCreateRoom} disabled={!newRoomName.trim()}>作成</Button>
        </DialogActions>
      </Dialog>

      <ChatTemplate
        username={username}
        onUsernameChange={handleUsernameChange}
        messages={currentMessages} // 現在のルームのメッセージを渡す
        messageInput={messageInput}
        onMessageInputChange={(e) => setMessageInput(e.target.value)}
        onSendMessage={handleSendMessage}
        isSendButtonDisabled={!messageInput.trim()}
      />
    </>
  );
}