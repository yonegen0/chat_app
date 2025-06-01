import React, { FormEvent } from 'react';
import { Container } from '../atoms/Container';
import { Paper } from '../atoms/Paper';
import { ChatHeader } from '../organisms/ChatHeader';
import { UserNameInput } from '../molecules/UserNameInput';
import { MessageList } from '../organisms/MessageList';
import { ChatInputForm } from '../organisms/ChatInputForm';
import { Message } from '../../types/index';

type ChatTemplateProps = {
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  messages: Message[];
  messageInput: string;
  onMessageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (event: FormEvent) => void;
  isSendButtonDisabled: boolean;
};

export const ChatTemplate = ({
  username,
  onUsernameChange,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  isSendButtonDisabled,
}: ChatTemplateProps) => {
  return (
    <Container maxWidth="sm" mt={4}>
      <Paper
        elevation={3}
        p={3}
        display="flex"
        flexDirection="column"
        height="85vh"
      >
        <ChatHeader />
        <UserNameInput username={username} onUsernameChange={onUsernameChange} />
        <MessageList messages={messages} currentUsername={username} />
        <ChatInputForm
          message={messageInput}
          onMessageChange={onMessageInputChange}
          onSendMessage={onSendMessage}
          isSendButtonDisabled={isSendButtonDisabled}
        />
      </Paper>
    </Container>
  );
};