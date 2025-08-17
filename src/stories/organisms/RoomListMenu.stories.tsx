import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RoomListMenu } from '../../components/organisms/RoomListMenu';

const meta = {
  title: 'Example/RoomListMenu',
  component: RoomListMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoomListMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // ここにargsを追加する
  args: {
    open: true,
    anchorEl: null, // 初期値はnull
    rooms: ['aaa', 'bbb'],
    currentRoom: 'aaa',
    onClose: fn(),
    onRoomChange: fn(),
    onOpenDeleteConfirmDialog: fn(),
    showAddRoomButton: true,
    onOpenCreateRoomDialog: fn(),
  },
};