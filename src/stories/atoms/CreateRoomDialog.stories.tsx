import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { CreateRoomDialog } from '../../components/atoms/CreateRoomDialog';

const meta = {
  title: 'Example/CreateRoomDialog',
  component: CreateRoomDialog,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof CreateRoomDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    open: true,
    onClose: fn(),
    value: 'a',
    onChange: fn(),
    onCreateRoom: fn(),
  },
};
