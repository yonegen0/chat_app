import React from 'react';
import { styled, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type RoomMenuItemProps = {
  // ルーム名
  roomName: string;
  // 選択の有無
  isSelected: boolean;
  // 選択アクション
  onSelect: () => void;
  // deleteアクション
  onDelete: () => void;
  // 一般ルームか否か
  isGeneral: boolean;
};

// styled
const StyledListItemIcon = styled(ListItemIcon)<{ backgroundColor?: string }>(({ backgroundColor }) => ({
  minWidth: 20,
  ml: 1
}));

// ルームリストの1項目
export const RoomMenuItem = (props: RoomMenuItemProps) => {
  return (
    <MenuItem onClick={props.onSelect} selected={props.isSelected}>
      <ListItemText>{props.roomName}</ListItemText>
      {!props.isGeneral && (
        <StyledListItemIcon
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete();
          }}
        >
          <DeleteIcon fontSize="small" />
        </StyledListItemIcon>
      )}
    </MenuItem>
  );
}