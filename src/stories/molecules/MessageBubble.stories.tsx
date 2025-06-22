import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { MessageBubble } from '../../components/molecules/MessageBubble';

const meta = {
  title: 'Example/MessageBubble',
  component: MessageBubble,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    message: {
      id: '1',
      text: 'aa',
      user: 'ax',
      timestamp: '2024/06/02',
    },
    isCurrentUser: true,
  },
};
