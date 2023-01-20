import { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css';
import { ForwardedRef, forwardRef } from 'react';

const Input = forwardRef(
	(
		{ error, className, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return (
			<>
				<div className={cn(className, styles.inputWrapper)}>
					<input
						ref={ref}
						className={cn(styles.input, {
							[styles.error]: error,
						})}
						{...props}
					/>
					{error && (
						<span role="alert" className={styles.errorMessage}>
							{error.message}
						</span>
					)}
				</div>
			</>
		);
	}
);

export default Input;
