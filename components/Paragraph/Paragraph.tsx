import { ParagraphProps } from './Paragraph.props';
import cn from 'classnames';
import styles from './Paragraph.module.css';

const Paragraph = ({
	children,
	size = '16px',
	className,
	...props
}: ParagraphProps): JSX.Element => {
	return (
		<p
			className={cn(className, {
				[styles.s14]: size === '14px',
				[styles.s16]: size === '16px',
				[styles.s18]: size === '18px',
			})}
			{...props}
		>
			{children}
		</p>
	);
};

export default Paragraph;
