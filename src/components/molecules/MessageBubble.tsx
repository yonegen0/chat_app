import React from 'react';
import { ListItem, Box, ListItemText, Typography, styled } from '@mui/material';
import { Message } from '../../types/index';

type MessageBubbleProps = {
  message: Message;
  isCurrentUser: boolean;
};

export const StyledListItem = styled(ListItem)<{ props: MessageBubbleProps }>(({ props }) => ({
  mb: 1,
  justifyContent: props.isCurrentUser ? 'flex-end' : 'flex-start',
}));

// 単一のメッセージ表示
export const MessageBubble = (props: MessageBubbleProps) => {

  return (
    <StyledListItem
      props={props}
      key={props.message.id}
      disablePadding
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ alignSelf: props.isCurrentUser ? 'flex-end' : 'flex-start' }}
            >
              {props.message.user}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 1,
                borderRadius: 1,
                maxWidth: '80%',
                backgroundColor: props.isCurrentUser ? '#dcf8c6' : '#bbdefb',
                wordBreak: 'break-word',
                alignSelf: props.isCurrentUser ? 'flex-end' : 'flex-start',
              }}
            >
              {props.message.text}
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ alignSelf: props.isCurrentUser ? 'flex-end' : 'flex-start', fontSize: '0.65rem' }}
            >
              {props.message.timestamp}
            </Typography>
          </Box>
        }
      />
    </StyledListItem>
  );
};