'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Message } from '../../types/index';
import { ChatTemplate } from '@/components/templates/ChatTemplate';
import { ChatHeader } from '@/components/organisms/ChatHeader';
import { useCreateRoom, useFetchRooms } from '@/hooks/useRooms';

// チャットアプリのページコンポーネント
export default function ChatPage() {
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string>('General');
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: Message[] }>({});
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState<string>('');

  // 新しいカスタムフックを使用してルームの作成と取得を処理
  const { createRoom } = useCreateRoom();
  const { rooms, fetchRooms } = useFetchRooms();

  // コンポーネントの初回ロード時にルーム一覧をAPIから取得
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // ユーザー名を管理するロジック（localStorageを使用）
  useEffect(() => {
    const storedUser = localStorage.getItem('chatUsername');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      const randomName = `Guest_${Math.floor(Math.random() * 10000)}`;
      setUsername(randomName);
      localStorage.setItem('chatUsername', randomName);
    }

    // ルームメッセージと現在のルームをlocalStorageから読み込む
    const storedRoomMessages = localStorage.getItem('chatRoomMessages');
    const storedCurrentRoom = localStorage.getItem('chatCurrentRoom');

    let initialRoomMessages: { [key: string]: Message[] } = { 'General': [] };
    let initialCurrentRoom: string = 'General';

    if (storedRoomMessages) {
      initialRoomMessages = JSON.parse(storedRoomMessages);
    }
    if (storedCurrentRoom) {
      initialCurrentRoom = storedCurrentRoom;
    }

    setRoomMessages(initialRoomMessages);
    setCurrentRoom(initialCurrentRoom);
  }, []);

  // ルームメッセージと現在のルームをlocalStorageに保存するロジック
  useEffect(() => {
    localStorage.setItem('chatRoomMessages', JSON.stringify(roomMessages));
    localStorage.setItem('chatCurrentRoom', currentRoom);
  }, [roomMessages, currentRoom]);

  const currentMessages = roomMessages[currentRoom] || [];

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        user: username,
        timestamp: new Date().toLocaleTimeString(),
      };
      setRoomMessages((prevRoomMessages) => ({
        ...prevRoomMessages,
        [currentRoom]: [...(prevRoomMessages[currentRoom] || []), newMessage],
      }));
      setMessageInput('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    localStorage.setItem('chatUsername', e.target.value);
  };

  const handleRoomChange = (roomName: string) => {
    setCurrentRoom(roomName);
  };

  // ルーム作成
  const handleCreateRoom = async () => {
    if (newRoomName.trim()) {
      // API呼び出しが成功した場合にルーム一覧を再取得
      const success = await createRoom(newRoomName.trim());
      if (success) {
        // APIから最新のルーム一覧を再取得
        await fetchRooms();
        // UIの状態をリセット
        setOpenCreateRoomDialog(false);
        setNewRoomName('');
      } else {
        // API呼び出しが失敗した場合はエラーハンドリング
        alert('ルームの作成に失敗しました。');
      }
    }
  };

  const handleDeleteRoom = () => {
    if (roomToDelete && roomToDelete !== 'General') {
      // ローカルのrooms stateを更新（APIからの更新に置き換えられるべき）
      const updatedRooms = rooms.filter((room) => room.name !== roomToDelete);
      // ローカルのroomMessagesを更新
      setRoomMessages((prevRoomMessages) => {
        const newRoomMessages = { ...prevRoomMessages };
        delete newRoomMessages[roomToDelete];
        return newRoomMessages;
      });

      if (currentRoom === roomToDelete) {
        const remainingRooms = updatedRooms;
        setCurrentRoom(remainingRooms.length > 0 ? remainingRooms[0].name : 'General');
      }
    } else if (roomToDelete === 'General') {
      alert("「General」ルームは削除できません。");
    }
    setOpenDeleteConfirmDialog(false);
    setRoomToDelete(null);
  };

  // ChatHeaderに渡すルーム一覧を、フックから取得したオブジェクトの配列に変換
  const roomNames = rooms.map(room => room.name);

  return (
    <>
      <ChatHeader
        currentRoom={currentRoom}
        rooms={roomNames}
        onRoomChange={handleRoomChange}
        onOpenCreateRoomDialog={() => setOpenCreateRoomDialog(true)}
        onOpenDeleteConfirmDialog={(roomName) => {
          setRoomToDelete(roomName);
          setOpenDeleteConfirmDialog(true);
        }}
        createRoomDialogProps={{
          open: openCreateRoomDialog,
          onClose: () => {
            setOpenCreateRoomDialog(false);
            setNewRoomName('');
          },
          value: newRoomName,
          onChange: (e) => setNewRoomName(e.target.value),
          onCreateRoom: handleCreateRoom,
        }}
        deleteRoomDialogProps={{
          open: openDeleteConfirmDialog,
          onClose: () => {
            setOpenDeleteConfirmDialog(false);
            setRoomToDelete(null);
          },
          value: roomToDelete || '',
          onDelete: handleDeleteRoom,
        }}
      />
      <ChatTemplate
        username={username}
        onUsernameChange={handleUsernameChange}
        messages={currentMessages}
        messageInput={messageInput}
        onMessageInputChange={(e) => setMessageInput(e.target.value)}
        onSendMessage={handleSendMessage}
        isSendButtonDisabled={!messageInput.trim()}
      />
    </>
  );
}