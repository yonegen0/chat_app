import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RoomAddButton } from '../../components/atoms/RoomAddButton';

const meta = {
  title: 'Example/RoomAddButton',
  component: RoomAddButton,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof RoomAddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    onClick: fn(),
  },
};
