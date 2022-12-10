import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Popover} from "./Popover";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const bottomLeft = Template.bind({});
bottomLeft.args = {
  trigger: <button style={{display: 'inline'}}>open</button>,
  direction: 'bottom left',
  children: (
    <>
      <span>1</span>
      <span>2</span>
    </>
  )
};

