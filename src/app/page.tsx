'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// メッセージの型定義
type Message = {
  id: string; // 各メッセージのID
  text: string; // メッセージの本文
  user: string; // メッセージを送信したユーザー名
  timestamp: string; // メッセージが送信された時刻（表示用）
};

// チャットアプリのページコンポーネント
export default function ChatPage() { 
  const [message, setMessage] = useState('');       // 入力フィールドのメッセージテキストを管理するstate
  const [messages, setMessages] = useState<Message[]>([]); // チャットに表示されるすべてのメッセージのリストを管理するstate
  const [username, setUsername] = useState<string>(''); // 現在のユーザー名を管理するstate

  const messagesEndRef = useRef<HTMLDivElement>(null); // チャットリストの最下部に自動スクロールにするためのstate

  useEffect(() => {
    // localStorage はブラウザのAPIなので、クライアントサイドでのみアクセス可能
    const storedUser = localStorage.getItem('chatUsername');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      const randomName = `Guest_${Math.floor(Math.random() * 10000)}`;
      setUsername(randomName);
      localStorage.setItem('chatUsername', randomName);
    }
  }, []);

  // メッセージが更新されるたびに、リストの最下部へスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // メッセージ送信時のハンドラ
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        user: username,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '85vh' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Chat App (チャットアプリ)
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">名前:</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem('chatUsername', e.target.value);
            }}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        <Paper
          variant="outlined"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            mb: 2,
            backgroundColor: '#e3f2fd',
          }}
        >
          <List sx={{ p: 0 }}>
            {messages.map((msg) => (
              <ListItem
                key={msg.id}
                disablePadding
                sx={{
                  mb: 1,
                  justifyContent: msg.user === username ? 'flex-end' : 'flex-start',
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ alignSelf: msg.user === username ? 'flex-end' : 'flex-start' }}
                      >
                        {msg.user}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          maxWidth: '80%',
                          backgroundColor: msg.user === username ? '#dcf8c6' : '#bbdefb',
                          wordBreak: 'break-word',
                          alignSelf: msg.user === username ? 'flex-end' : 'flex-start',
                        }}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ alignSelf: msg.user === username ? 'flex-end' : 'flex-start', fontSize: '0.65rem' }}
                      >
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="メッセージを入力してください"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            disabled={!message.trim()}
            sx={{
              whiteSpace: 'nowrap', 
            }}
          >
            送信
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}