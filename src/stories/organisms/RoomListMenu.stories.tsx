import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { RoomListMenu } from '../../components/organisms/RoomListMenu';
import { useState } from 'react';

const meta = {
  title: 'Example/RoomListMenu',
  component: RoomListMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoomListMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// useStateをラップするコンポーネント
const WrapperComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <RoomListMenu
      open={true}
      anchorEl={anchorEl}
      onClose={fn()}
      rooms={['aaa', 'bbb']}
      currentRoom="aaa"
      onRoomChange={fn()}
      onOpenDeleteConfirmDialog={fn()}
      showAddRoomButton={true}
      onOpenCreateRoomDialog={fn()}
    />
  );
};

export const Default: Story = {
  render: () => <WrapperComponent />,
};
