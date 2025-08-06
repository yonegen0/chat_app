import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RoomMenuButton } from '../../components/atoms/RoomMenuButton';

const meta = {
  title: 'Example/RoomMenuButton',
  component: RoomMenuButton,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof RoomMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    onClick: fn(),
  },
};
