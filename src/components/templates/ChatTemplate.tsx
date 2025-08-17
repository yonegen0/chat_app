import React, { FormEvent } from 'react';
import { UserNameInput } from '../molecules/UserNameInput';
import { MessageList } from '../organisms/MessageList';
import { ChatInputForm } from '../organisms/ChatInputForm';
import { Message } from '../../types/index';
import { Container, Paper, styled } from '@mui/material';

export type ChatTemplateProps = {
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  messages: Message[];
  messageInput: string;
  onMessageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (event: FormEvent) => void;
  isSendButtonDisabled: boolean;
};

export const StyledContainer = styled(Container)({
  maxWidth: "sm",
  mt: 4,
});
export const StyledPaper = styled(Paper)({
  elevation:3,
  p:3,
  display:"flex",
  flexDirection:"column",
  height:"85vh",
});


export const ChatTemplate = (props: ChatTemplateProps) => {

  return (
    <StyledContainer>
      <StyledPaper>
        <UserNameInput username={props.username} onUsernameChange={props.onUsernameChange} />
        <MessageList messages={props.messages} currentUsername={props.username} />
        <ChatInputForm
          message={props.messageInput}
          onMessageChange={props.onMessageInputChange}
          onSendMessage={props.onSendMessage}
          isSendButtonDisabled={props.isSendButtonDisabled}
        />
      </StyledPaper>
    </StyledContainer>
  );
};