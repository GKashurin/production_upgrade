import {addDecorator} from '@storybook/react';
import {StyleDecorator} from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import {ThemeDecorator} from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {Theme} from '../../src/shared/const/theme';
import {RouterDecorator} from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import {SuspenseDecorator} from "../../src/shared/config/storybook/SuspenseDecorartor/SuspenseDecorator";

export const parameters = {
	actions: {argTypesRegex: '^on[A-Z].*'},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	themes: {
		default: 'black',
		list: [
			{name: 'light', class: Theme.LIGHT, color: '#e8e8ea'},
			{name: 'dark', class: Theme.DARK, color: '#090949'},
			{name: 'black', class: Theme.BLACK, color: '#343232'},
		]
	}
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
