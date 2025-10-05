import { useState, useEffect } from 'react';
import { Room, Message } from '@/types/index';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

/**
 * ユーザー名をAPI経由で管理するためのフック。
 * 初回ロード時にユーザー名をAPIから取得または作成し、
 * ユーザーID（int）を状態として保持します。
 */
export const useUserApi = () => {
  const [username, setUsernameState] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ユーザー名をLocalStorageから取得・生成
  const getUsernameFromLocalStorage = () => {
    let storedUsername = localStorage.getItem('chatUsername');
    if (!storedUsername) {
      storedUsername = `Guest_${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem('chatUsername', storedUsername);
    }
    return storedUsername;
  };

  // 初回ロード時にユーザー名とIDを取得または作成
  useEffect(() => {
    const fetchOrCreateUser = async () => {
      setLoading(true);
      setError(null);
      const currentUsername = getUsernameFromLocalStorage();
      try {
        // APIからユーザー情報を取得
        const response = await fetch(`${WEB_API_URL}/users/${currentUsername}`);
        if (response.ok) {
          const data = await response.json();
          setUsernameState(data.name);
          setUserId(data.id);
        } else {
          // ユーザーが存在しない場合は新規作成
          const createResponse = await fetch(`${WEB_API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: currentUsername }),
          });
          if (createResponse.ok) {
            const data = await createResponse.json();
            setUsernameState(data.name);
            setUserId(data.id);
          } else {
            throw new Error('ユーザーの作成に失敗しました。');
          }
        }
      } catch (e: any) {
        setError(e.message || 'ユーザー情報の取得/作成中に不明なエラーが発生しました。');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrCreateUser();
  }, []);

  // ユーザー名を変更するロジック
  const setUsername = async (newUsername: string) => {
    const oldUsername = getUsernameFromLocalStorage();
    setUsernameState(newUsername);
    localStorage.setItem('chatUsername', newUsername);
    try {
      // APIにユーザー名の変更を送信
      const response = await fetch(`${WEB_API_URL}/users/${oldUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUsername }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ユーザー名の変更に失敗しました。');
      }
    } catch (e: any) {
      console.error('ユーザー名の更新に失敗しました:', e);
      // エラーが発生した場合でも、UI上は変更後のユーザー名を表示
    }
  };

  return { username, setUsername, userId, loading, error };
};

/**
 * メッセージ送信・取得APIを呼び出すためのフック。
 */
export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userId: number, roomId: number, messageText: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${WEB_API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, roomId, message_text: messageText }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'メッセージの送信に失敗しました。');
      }
      return true;
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const fetchMessages = async (roomId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${WEB_API_URL}/rooms/${roomId}/messages`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'メッセージの取得に失敗しました。');
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, messages, fetchMessages, loading, error };
};

/**
 * ルーム作成API (POST /addRooms) を呼び出すためのフック。
 */
export const useCreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const createRoom = async (roomName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setRoom(null);
    console.info('roomName:',roomName);
    try {
      const response = await fetch(`${WEB_API_URL}/addRooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roomName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルームの作成に失敗しました。');
      }
      const data = await response.json();
      setRoom(data.room);
      return true;
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { createRoom, loading, error, room };
};

/**
 * ルーム一覧取得API (GET /rooms) を呼び出すためのフック。
 */
export const useFetchRooms = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const fetchRooms = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${WEB_API_URL}/rooms`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルーム一覧の取得に失敗しました。');
      }
      const data = await response.json();
      setRooms(data.rooms);
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };
  return { fetchRooms, rooms, loading, error };
};

/**
 * ルーム削除API (DELETE /rooms/{roomId}) を呼び出すためのフック。
 */
export const useDeleteRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const deleteRoom = async (roomId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${WEB_API_URL}/rooms/${roomId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルームの削除に失敗しました。');
      }
      return true;
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { deleteRoom, loading, error };
};