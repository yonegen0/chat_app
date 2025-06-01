import React, { useRef, useEffect } from 'react';
import { Paper } from '../atoms/Paper';
import { List } from '../atoms/List';
import { MessageBubble } from '../molecules/MessageBubble';
import { Message } from '../../types/index';

type MessageListProps = {
  messages: Message[];
  currentUsername: string;
};

// メッセージのリスト表示
export const MessageList = ({ messages, currentUsername }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Paper
      variant="outlined"
      flexGrow={1}
      overflowY="auto"
      p={2}
      mb={2}
      backgroundColor="#e3f2fd"
    >
      <List p={0}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.user === currentUsername} />
        ))}
        <div ref={messagesEndRef} />
      </List>
    </Paper>
  );
};