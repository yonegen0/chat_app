import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { MessageList } from '../../components/organisms/MessageList';

const meta = {
  title: 'Example/MessageList',
  component: MessageList,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    messages: [
      {
        id: '1',
        text: 'aa',
        user: 'ax',
        timestamp: '2024/06/02',
      },
      {
        id: '2',
        text: 'bb',
        user: 'az',
        timestamp: '2024/06/02',
      },
    ],
    currentUsername: 'ax',
  },
};
