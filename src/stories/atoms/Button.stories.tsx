import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from '../../components/atoms/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'normal',
  },
};
