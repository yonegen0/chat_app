'use client';

import React, { useState, FormEvent } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material'; 

/**
 * ログインフォームコンポーネント
 */
export default function LoginForm() {
  // ユーザー名の状態
  const [username, setUsername] = useState<string>('');
  // パスワードの状態
  const [password, setPassword] = useState<string>('');
  // エラーメッセージの状態
  const [error, setError] = useState<string | null>(null);
  // ログイン成功メッセージの状態
  const [success, setSuccess] = useState<string | null>(null);
  // ローディング状態
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * フォーム送信時のハンドラ
   * @param event FormEvent<HTMLFormElement> - フォームイベント
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページの再読み込みを防ぐ

    setError(null); // エラーメッセージをクリア
    setSuccess(null); // 成功メッセージをクリア
    setLoading(true); // ローディング開始

    // 認証処理
    try {
      if (username === 'user' && password === 'password') {
        // 成功時の処理
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSuccess('ログインに成功しました！');
      } else {
        // 失敗時の処理
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setError('ユーザー名またはパスワードが間違っています。');
      }
    } catch (err) {
      console.error('ログイン中にエラーが発生しました:', err);
      setError('ログイン中に予期せぬエラーが発生しました。');
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          ログイン
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="ユーザー名"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            label="パスワード"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};