'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Message } from '../../types/index';
import { ChatTemplate } from '@/components/templates/ChatTemplate';
import { ChatHeader } from '@/components/organisms/ChatHeader';

// チャットアプリのページコンポーネント
export default function ChatPage() {
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('General');
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: Message[] }>({});
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('chatUsername');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      const randomName = `Guest_${Math.floor(Math.random() * 10000)}`;
      setUsername(randomName);
      localStorage.setItem('chatUsername', randomName);
    }

    const storedRooms = localStorage.getItem('chatRooms');
    const storedRoomMessages = localStorage.getItem('chatRoomMessages');
    const storedCurrentRoom = localStorage.getItem('chatCurrentRoom');

    let initialRooms: string[] = ['General'];
    let initialRoomMessages: { [key: string]: Message[] } = { 'General': [] };
    let initialCurrentRoom: string = 'General';

    if (storedRooms) {
      initialRooms = JSON.parse(storedRooms);
    }
    if (storedRoomMessages) {
      initialRoomMessages = JSON.parse(storedRoomMessages);
    }
    if (storedCurrentRoom && initialRooms.includes(storedCurrentRoom)) {
      initialCurrentRoom = storedCurrentRoom;
    } else if (initialRooms.length > 0) {
      initialCurrentRoom = initialRooms[0];
    }

    if (!initialRooms.includes('General')) {
      initialRooms = ['General', ...initialRooms];
      initialRoomMessages = { 'General': [], ...initialRoomMessages };
    }

    setRooms(initialRooms);
    setRoomMessages(initialRoomMessages);
    setCurrentRoom(initialCurrentRoom);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatRooms', JSON.stringify(rooms));
    localStorage.setItem('chatRoomMessages', JSON.stringify(roomMessages));
    localStorage.setItem('chatCurrentRoom', currentRoom);
  }, [rooms, roomMessages, currentRoom]);

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

  const handleCreateRoom = () => {
    if (newRoomName.trim() && !rooms.includes(newRoomName.trim())) {
      const trimmedRoomName = newRoomName.trim();
      setRooms((prevRooms) => [...prevRooms, trimmedRoomName]);
      setRoomMessages((prevRoomMessages) => ({
        ...prevRoomMessages,
        [trimmedRoomName]: [],
      }));
      setCurrentRoom(trimmedRoomName);
      setOpenCreateRoomDialog(false);
      setNewRoomName('');
    } else {
      alert('ルーム名が無効か、すでに存在しています。');
    }
  };

  const handleDeleteRoom = () => {
    if (roomToDelete && roomToDelete !== 'General') {
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomToDelete));
      setRoomMessages((prevRoomMessages) => {
        const newRoomMessages = { ...prevRoomMessages };
        delete newRoomMessages[roomToDelete];
        return newRoomMessages;
      });

      if (currentRoom === roomToDelete) {
        const remainingRooms = rooms.filter((room) => room !== roomToDelete);
        setCurrentRoom(remainingRooms.length > 0 ? remainingRooms[0] : 'General');
      }
    } else if (roomToDelete === 'General') {
      alert("「General」ルームは削除できません。");
    }
    setOpenDeleteConfirmDialog(false);
    setRoomToDelete(null);
  };

  return (
    <>
      <ChatHeader
        currentRoom={currentRoom}
        rooms={rooms}
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