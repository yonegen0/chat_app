import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { DeleteRoomDialog } from '../../components/atoms/DeleteRoomDialog';

const meta = {
  title: 'Example/DeleteRoomDialog',
  component: DeleteRoomDialog,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof DeleteRoomDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    open: true,
    onClose: fn(),
    value: 'a',
    onDelete: fn(),
  },
};
