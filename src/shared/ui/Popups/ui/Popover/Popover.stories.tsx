import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Popover } from './Popover';

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger: (
    <button type="button" style={{ display: 'inline' }}>
      open
    </button>
  ),
  direction: 'bottom left',
  children: (
    <>
      <span>1</span>
      <span>2</span>
    </>
  ),
};
