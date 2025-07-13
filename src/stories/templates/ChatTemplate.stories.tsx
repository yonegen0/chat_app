import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ChatTemplate } from '../../components/templates/ChatTemplate';

const meta = {
  title: 'Example/ChatTemplate',
  component: ChatTemplate,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ChatTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    username: 'user',
    onUsernameChange: fn(),
    messages:  [
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
    messageInput: '',
    onMessageInputChange: fn(),
    onSendMessage: fn(),
    isSendButtonDisabled: false,
  },
};
