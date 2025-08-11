import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RoomMenuItem } from '../../components/molecules/RoomMenuItem';

const meta = {
  title: 'Example/RoomMenuItem',
  component: RoomMenuItem,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof RoomMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    roomName: "ルーム",
    isSelected: true,
    onSelect: fn(),
    onDelete: fn(),
    isGeneral: true,
  },
};
