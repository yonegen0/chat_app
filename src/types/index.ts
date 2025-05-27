// メッセージ
export type Message = {
  id: string; // 各メッセージのID
  text: string; // メッセージの本文
  user: string; // メッセージを送信したユーザー名
  timestamp: string; // メッセージが送信された時刻（表示用）
};