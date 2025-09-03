import { useState, useEffect } from 'react';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

/**
 * ユーザー名をAPI経由で管理するためのフック。
 * 初回ロード時にユーザー名をAPIから取得または作成し、
 * ユーザー名変更をAPIに送信します。
 */
export const useUserApi = () => {
  const [username, setUsernameState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ユーザーIDを取得または作成するヘルパー関数
  const getUserId = () => {
    let userId = localStorage.getItem('chatUserId');
    if (!userId) {
      userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatUserId', userId);
    }
    return userId;
  };

  // 初回ロード時にユーザー名を取得または作成
  useEffect(() => {
    const fetchOrCreateUser = async () => {
      setLoading(true);
      setError(null);
      const userId = getUserId();
      try {
        // APIからユーザー情報を取得
        const response = await fetch(`${WEB_API_URL}/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUsernameState(data.name);
        } else {
          // ユーザーが存在しない場合は新規作成
          const newUsername = `Guest_${Math.floor(Math.random() * 10000)}`;
          const createResponse = await fetch(`${WEB_API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId, name: newUsername }),
          });
          if (createResponse.ok) {
            setUsernameState(newUsername);
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

  return { username, loading, error };
};

/**
 * ルーム作成API (POST /addRooms) を呼び出すためのフック。
 */
export const useCreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<{ id: number; name: string } | null>(null);
  const createRoom = async (roomName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setRoom(null);
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
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
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
