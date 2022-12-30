import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastName: 'Кашурин',
        firstName: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar: 'https://img.freepik.com/free-vector/binary-code-concept-illustration_114360-6578.jpg?w=740&t=st=1667115876~exp=1667116476~hmac=631688225444e68e4c5a596f51bfc5281f461f4539d2baeffcc0f4baaba83902',
    },
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
