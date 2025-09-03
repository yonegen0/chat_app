'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Message } from '../../types/index';
import { ChatTemplate } from '@/components/templates/ChatTemplate';
import { ChatHeader } from '@/components/organisms/ChatHeader';
import { useCreateRoom, useFetchRooms, useDeleteRoom, useUserApi } from '@/hooks/useRooms';

// チャットアプリのページコンポーネント
export default function ChatPage() {
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<{ id: number; name: string } | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string>('General');
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: Message[] }>({});
  const [messageInput, setMessageInput] = useState('');
  
  // ユーザー名を管理するロジックをAPI経由に変更
  const { username } = useUserApi();

  // 新しいカスタムフックを使用してルームの作成と取得を処理
  const { createRoom } = useCreateRoom();
  const { rooms, fetchRooms } = useFetchRooms();
  const { deleteRoom } = useDeleteRoom();

  // コンポーネントの初回ロード時にルーム一覧をAPIから取得
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // ルーム一覧が更新されたときに、現在のルームがまだ存在するか確認する
  useEffect(() => {
    if (rooms.length > 0) {
      const currentRoomExists = rooms.some(room => room.name === currentRoom);
      if (!currentRoomExists) {
        // 存在しない場合、最初のルームに切り替える
        setCurrentRoom(rooms[0].name);
      }
    }
  }, [rooms, currentRoom]);

  // ルームメッセージと現在のルームをlocalStorageから読み込む
  useEffect(() => {
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
    // ユーザー名変更処理
  };

  const handleRoomChange = (roomName: string) => {
    setCurrentRoom(roomName);
  };

  // ルーム作成
  const handleCreateRoom = async () => {
    if (newRoomName.trim()) {
      const success = await createRoom(newRoomName.trim());
      if (success) {
        await fetchRooms();
        setOpenCreateRoomDialog(false);
        setNewRoomName('');
      } else {
        alert('ルームの作成に失敗しました。');
      }
    }
  };

  // ルーム削除ロジックをAPI呼び出しに変更
  const handleDeleteRoom = async () => {
    if (roomToDelete && roomToDelete.name !== 'General') {
      const success = await deleteRoom(roomToDelete.id);
      if (success) {
        // 成功した場合、ルーム一覧を再取得
        await fetchRooms();
        // ローカルのroomMessagesを更新
        setRoomMessages((prevRoomMessages) => {
          const newRoomMessages = { ...prevRoomMessages };
          delete newRoomMessages[roomToDelete.name];
          return newRoomMessages;
        });
      } else {
        alert('ルームの削除に失敗しました。');
      }
    } else if (roomToDelete && roomToDelete.name === 'General') {
      alert("「General」ルームは削除できません。");
    }
    setOpenDeleteConfirmDialog(false);
    setRoomToDelete(null);
  };

  // ChatHeaderに渡すルーム一覧を、フックから取得したオブジェクトの配列に変換
  const roomNames = rooms.map(room => room.name);
  const getRoomByName = (roomName: string) => rooms.find(room => room.name === roomName);

  return (
    <>
      <ChatHeader
        currentRoom={currentRoom}
        rooms={roomNames}
        onRoomChange={handleRoomChange}
        onOpenCreateRoomDialog={() => setOpenCreateRoomDialog(true)}
        onOpenDeleteConfirmDialog={(roomName) => {
          const room = getRoomByName(roomName);
          if (room) {
            setRoomToDelete(room);
            setOpenDeleteConfirmDialog(true);
          }
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
          value: roomToDelete?.name || '',
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
