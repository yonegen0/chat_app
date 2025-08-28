import { useState } from 'react';

// バックエンドのbaseurl
const WEB_API_URL = 'http://127.0.0.1:5000';

/**
 * ルーム作成API (POST /addRooms) を呼び出すためのReactカスタムフック。
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