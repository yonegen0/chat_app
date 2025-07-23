'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { ChatTemplate } from '../components/templates/ChatTemplate';
import { Message } from '../types/index';
import { Button, Divider, Paper, Typography } from '@mui/material';

// チャットアプリのページコンポーネント
export default function ChatPage() {
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
    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        ルーム選択
      </Typography>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{width:'10px'}}
      >
        +
      </Button>
      <Divider sx={{ mb: 2 }} />
    </Paper>
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