import { ReactNode } from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	tag: 'h1' | 'h2' | 'h3';
	children: ReactNode;
}
