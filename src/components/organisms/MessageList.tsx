import React, { useRef, useEffect } from 'react';
import { Paper, List, styled } from '@mui/material';
import { MessageBubble } from '../molecules/MessageBubble';
import { Message } from '../../types/index';

export type MessageListProps = {
  messages: Message[];
  currentUsername: string;
};

export const StyledPaper = styled(Paper)({
  flexGrow : 1,
  overflowY:"auto",
  p : 2,
  mb : 2,
  backgroundColor:"#e3f2fd",
});
export const StyledList = styled(List)({
  p : 1,
});

// メッセージのリスト表示
export const MessageList = (props: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.messages]);

  return (
    <StyledPaper
      variant="outlined"
    >
      <StyledList>
        {props.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.user === props.currentUsername} />
        ))}
        <div ref={messagesEndRef} />
      </StyledList>
    </StyledPaper>
  );
};