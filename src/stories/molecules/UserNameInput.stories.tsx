import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { UserNameInput } from '../../components/molecules/UserNameInput';

const meta = {
  title: 'Example/UserNameInput',
  component: UserNameInput,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof UserNameInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    username:'a',
    onUsernameChange(event) {
      fn();
    },
  },
};
