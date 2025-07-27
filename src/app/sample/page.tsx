'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { ChatTemplate } from '../../components/templates/ChatTemplate';
import { Message } from '../../types/index';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from '@mui/icons-material/Add';

// チャットアプリのページコンポーネント
export default function ChatPage() {
  //  メニューを表示するための変数を定義
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //  メニューが開いているかどうかを判定
  const open = Boolean(anchorEl);
  //　ボタンをクリックしたときにメニューを表示する
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //  メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>('');

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

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        user: username,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    localStorage.setItem('chatUsername', e.target.value);
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
            チャットアプリ
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ mr: 2 }}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-button"
          >
            <MenuItem onClick={handleClose}>ルーム作成</MenuItem>
          </Menu>
          <Button color="inherit">ログアウト</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <ChatTemplate
      username={username}
      onUsernameChange={handleUsernameChange}
      messages={messages}
      messageInput={messageInput}
      onMessageInputChange={(e) => setMessageInput(e.target.value)}
      onSendMessage={handleSendMessage}
      isSendButtonDisabled={!messageInput.trim()}
    />
    </>
  );
}