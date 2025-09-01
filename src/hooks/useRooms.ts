import { useState } from 'react';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

/**
 * ルーム作成API (POST /addRooms) を呼び出すためのフック。
 */
export const useCreateRoom = () => {
  // API呼び出しの状態を管理するためのstate
  const [loading, setLoading] = useState<boolean>(false);
  // エラーメッセージを管理するためのstate
  const [error, setError] = useState<string | null>(null);
  // 作成されたルームのデータを管理するためのstate
  const [room, setRoom] = useState<{ id: number; name: string } | null>(null);

  /**
   * 新しいルームを作成するためにAPIを呼び出す非同期関数。
   *
   * @param {string} roomName 作成するルームの名前。
   * @returns {Promise<boolean>} ルーム作成が成功した場合はtrue、失敗した場合はfalseを返します。
   */
  const createRoom = async (roomName: string): Promise<boolean> => {
    setLoading(true); // ローディングを開始
    setError(null);    // エラーをリセット
    setRoom(null);     // ルームデータをリセット

    try {
      // APIエンドポイントのURL
      const response = await fetch(`${WEB_API_URL}/addRooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName }), // ルーム名をJSON形式で送信
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルームの作成に失敗しました。');
      }

      const data = await response.json();
      setRoom(data.room); // 成功した場合、ルームデータをセット
      return true; // 成功
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。'); // エラーメッセージをセット
      return false; // 失敗
    } finally {
      setLoading(false); // ローディングを終了
    }
  };

  return { createRoom, loading, error, room };
};

/**
 * ルーム一覧取得API (GET /rooms) を呼び出すためのフック。
 */
export const useFetchRooms = () => {
  // API呼び出しの状態を管理するためのstate
  const [loading, setLoading] = useState<boolean>(false);
  // エラーメッセージを管理するためのstate
  const [error, setError] = useState<string | null>(null);
  // 取得したルームのリストを管理するためのstate
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);

  /**
   * ルーム一覧を取得するためにAPIを呼び出す非同期関数。
   */
  const fetchRooms = async (): Promise<void> => {
    setLoading(true); // ローディングを開始
    setError(null);    // エラーをリセット
    
    try {
      const response = await fetch(`${WEB_API_URL}/rooms`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルーム一覧の取得に失敗しました。');
      }

      const data = await response.json();
      setRooms(data.rooms); 
    } catch (e: any) {
      setError(e.message || '不明なエラーが発生しました。'); // エラーメッセージをセット
    } finally {
      setLoading(false); // ローディングを終了
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

  /**
   * ルームを削除するAPIを呼び出す非同期関数。
   *
   * @param {number} roomId 削除するルームのID。
   * @returns {Promise<boolean>} 削除が成功した場合はtrue、失敗した場合はfalseを返します。
   */
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
