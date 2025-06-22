import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Typography } from '../../components/atoms/Typography';

const meta = {
  title: 'Example/Typography',
  component: Typography,
  parameters: {

    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'normal',
  },
};
