import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from '../Up/Up.svg';
import close from './close.svg';
import menu from './Menu.svg';

export const icons = {
	up,
	close,
	menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearance: 'primary' | 'white';
	icon: IconName;
}
