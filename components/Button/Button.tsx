import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import ArrowIcon from './Arrow.svg';
import { motion } from 'framer-motion';
const Button = ({
	appearance,
	children,
	className,
	arrow = 'none',
	...props
}: ButtonProps): JSX.Element => {
	
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow === 'down',
					})}
				>
					{<ArrowIcon />}
				</span>
			)}
		</motion.button>
	);
};

export default Button;
