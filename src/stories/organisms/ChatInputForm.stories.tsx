import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ChatInputForm } from '../../components/organisms/ChatInputForm';

const meta = {
  title: 'Example/ChatInputForm',
  component: ChatInputForm,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ChatInputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    message: 'a',
    isSendButtonDisabled: false
  },
};
