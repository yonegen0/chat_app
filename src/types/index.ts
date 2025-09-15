// メッセージ
export type Message = {
  id: string; // メッセージのID
  text: string; // メッセージの本文
  user: string; // メッセージを送信したユーザー名
  timestamp: string; // メッセージが送信された時刻（表示用）
};

// ルーム
export type Room = {
  id: number; // ルームのID
  name: string; // ルームの名前
};