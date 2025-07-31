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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // 削除アイコン

// チャットアプリのページコンポーネント
export default function ChatPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [roomAnchorEl, setRoomAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const roomOpen = Boolean(roomAnchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const roomHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRoomAnchorEl(event.currentTarget);
  };
  const roomHandleClose = () => {
    setRoomAnchorEl(null);
  };

  // ルーム作成ダイアログの状態管理
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  // ルーム削除確認ダイアログの状態管理
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  // 複数ルーム管理のためのステート
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('General');
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

    const storedRooms = localStorage.getItem('chatRooms');
    const storedRoomMessages = localStorage.getItem('chatRoomMessages');
    const storedCurrentRoom = localStorage.getItem('chatCurrentRoom');

    let initialRooms: string[] = ['General'];
    let initialRoomMessages: { [key: string]: Message[] } = { 'General': [] };
    let initialCurrentRoom: string = 'General';

    if (storedRooms) {
      initialRooms = JSON.parse(storedRooms);
    }
    if (storedRoomMessages) {
      initialRoomMessages = JSON.parse(storedRoomMessages);
    }
    if (storedCurrentRoom && initialRooms.includes(storedCurrentRoom)) {
      initialCurrentRoom = storedCurrentRoom;
    } else if (initialRooms.length > 0) {
      initialCurrentRoom = initialRooms[0]; // 保存されたcurrentRoomが存在しないか、削除された場合は最初のルームに設定
    }

    // "General" ルームがなければ追加する
    if (!initialRooms.includes('General')) {
      initialRooms = ['General', ...initialRooms];
      initialRoomMessages = { 'General': [], ...initialRoomMessages };
    }

    setRooms(initialRooms);
    setRoomMessages(initialRoomMessages);
    setCurrentRoom(initialCurrentRoom);
  }, []);

  // currentRoom または roomMessages が変更されたときにlocalStorageを更新
  useEffect(() => {
    localStorage.setItem('chatRooms', JSON.stringify(rooms));
    localStorage.setItem('chatRoomMessages', JSON.stringify(roomMessages));
    localStorage.setItem('chatCurrentRoom', currentRoom);
  }, [rooms, roomMessages, currentRoom]);

  const currentMessages = roomMessages[currentRoom] || [];

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        user: username,
        timestamp: new Date().toLocaleTimeString(),
      };

      setRoomMessages((prevRoomMessages) => ({
        ...prevRoomMessages,
        [currentRoom]: [...(prevRoomMessages[currentRoom] || []), newMessage],
      }));
      setMessageInput('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    localStorage.setItem('chatUsername', e.target.value);
  };

  const handleRoomChange = (roomName: string) => {
    setCurrentRoom(roomName);
    handleClose();
  };

  const handleOpenCreateRoomDialog = () => {
    setOpenCreateRoomDialog(true);
    handleClose();
  };

  const handleCloseCreateRoomDialog = () => {
    setOpenCreateRoomDialog(false);
    setNewRoomName('');
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim() && !rooms.includes(newRoomName.trim())) {
      const trimmedRoomName = newRoomName.trim();
      setRooms((prevRooms) => [...prevRooms, trimmedRoomName]);
      setRoomMessages((prevRoomMessages) => ({
        ...prevRoomMessages,
        [trimmedRoomName]: [],
      }));
      setCurrentRoom(trimmedRoomName);
      handleCloseCreateRoomDialog();
    } else {
      alert('ルーム名が無効か、すでに存在しています。');
    }
  };

  // ルーム削除確認ダイアログを開くハンドラ
  const handleOpenDeleteConfirmDialog = (roomName: string) => {
    setRoomToDelete(roomName);
    setOpenDeleteConfirmDialog(true);
    handleClose(); // メニューを閉じる
  };

  // ルーム削除確認ダイアログを閉じるハンドラ
  const handleCloseDeleteConfirmDialog = () => {
    setOpenDeleteConfirmDialog(false);
    setRoomToDelete(null);
  };

  // ルーム削除の確定ハンドラ
  const handleDeleteRoom = () => {
    if (roomToDelete && roomToDelete !== 'General') { // 'General'ルームは削除不可とする
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomToDelete));

      setRoomMessages((prevRoomMessages) => {
        const newRoomMessages = { ...prevRoomMessages };
        delete newRoomMessages[roomToDelete];
        return newRoomMessages;
      });

      // 削除したルームが現在のルームだった場合、別のルームに切り替える
      if (currentRoom === roomToDelete) {
        // 削除後、残っているルームがあれば最初のルームに、なければ'General'に切り替える
        const remainingRooms = rooms.filter((room) => room !== roomToDelete);
        setCurrentRoom(remainingRooms.length > 0 ? remainingRooms[0] : 'General');
      }
    } else if (roomToDelete === 'General') {
        alert("「General」ルームは削除できません。");
    }
    handleCloseDeleteConfirmDialog();
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
              onClick={roomHandleClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="room-menu"
              anchorEl={roomAnchorEl}
              open={roomOpen}
              onClose={roomHandleClose}
              aria-labelledby="room-menu-button"
            >
              {/* 既存のルームをマップして表示 */}
              {rooms.map((room) => (
                <MenuItem
                  key={room}
                  onClick={() => handleRoomChange(room)} // ルーム切り替えは引き続き可能
                  selected={room === currentRoom}
                >
                  <ListItemText>{room}</ListItemText>
                  {/* Generalルーム以外に削除ボタンを表示 */}
                  {room !== 'General' && (
                    <ListItemIcon
                      onClick={(e) => {
                        e.stopPropagation(); // 親要素のMenuItemのonClickが発火しないようにする
                        handleOpenDeleteConfirmDialog(room);
                      }}
                      sx={{ minWidth: 20, ml: 1 }} // アイコンの位置調整
                    >
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                  )}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              チャットアプリ - 現在のルーム: {currentRoom}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="ルーム操作メニュー" // ARIAラベルを更新
              onClick={handleClick}
              id="room-menu-button"
              aria-controls={open ? "room-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ mr: 2 }}
            >
              <AddIcon />
            </IconButton>
            <Menu
              id="room-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-labelledby="room-menu-button"
            >
              <MenuItem onClick={handleOpenCreateRoomDialog}>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>新しいルームを作成</ListItemText>
              </MenuItem>
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

      {/* ルーム削除確認ダイアログ */}
      <Dialog open={openDeleteConfirmDialog} onClose={handleCloseDeleteConfirmDialog}>
        <DialogTitle>ルームを削除しますか？</DialogTitle>
        <DialogContent>
          <Typography>本当にルーム「{roomToDelete}」を削除してもよろしいですか？この操作は元に戻せません。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmDialog}>キャンセル</Button>
          <Button onClick={handleDeleteRoom} color="error">削除</Button>
        </DialogActions>
      </Dialog>

      <ChatTemplate
        username={username}
        onUsernameChange={handleUsernameChange}
        messages={currentMessages}
        messageInput={messageInput}
        onMessageInputChange={(e) => setMessageInput(e.target.value)}
        onSendMessage={handleSendMessage}
        isSendButtonDisabled={!messageInput.trim()}
      />
    </>
  );
}