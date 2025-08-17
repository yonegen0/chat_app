import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ChatHeader } from '../../components/organisms/ChatHeader';

const meta = {
  title: 'Example/ChatHeader',
  component: ChatHeader,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    rooms: ['aaa', 'bbb'],
    currentRoom: 'aaa',
    onRoomChange: fn(),
    onOpenCreateRoomDialog: fn(),
    onOpenDeleteConfirmDialog: fn(),
    createRoomDialogProps: {
      open: false,
      onClose: fn(),
      value: 'a',
      onChange: fn(),
      onCreateRoom: fn(),
    },
    deleteRoomDialogProps: {
      open: false,
      onClose: fn(),
      value: 'a',
      onDelete: fn(),
    },
  },
};
