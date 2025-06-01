import React from 'react';
import { ListItem } from '../atoms/ListItem';
import { Typography } from '../atoms/Typography';
import { Box } from '../atoms/Box';
import { ListItemText } from '../atoms/ListItemText';
import { Message } from '../../types/index';

type MessageBubbleProps = {
  message: Message;
  isCurrentUser: boolean;
};

// 単一のメッセージ表示
export const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  const primaryTextColor = isCurrentUser ? 'text.primary' : 'text.primary';
  const secondaryTextColor = 'text.secondary';

  return (
    <ListItem
      mb={1}
      justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
      disablePadding
    >
      <ListItemText
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
        primary={
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              color="text.secondary"
              alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}
            >
              {message.user}
            </Typography>
            <Typography
              variant="body1"
              p={1}
              borderRadius={1}
              maxWidth="80%"
              backgroundColor={isCurrentUser ? '#dcf8c6' : '#bbdefb'}
              wordBreak="break-word"
              alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}
            >
              {message.text}
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}
              fontSize="0.65rem"
            >
              {message.timestamp}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
};