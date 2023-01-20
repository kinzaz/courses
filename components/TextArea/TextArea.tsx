import { TextAreaProps } from './TextArea.props';
import cn from 'classnames';
import styles from './TextArea.module.css';
import { ForwardedRef, forwardRef } from 'react';

const TextArea = forwardRef(
	(
		{ error, className, ...props }: TextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return (
			<div className={cn(styles.wrapper, className)}>
				<textarea
					ref={ref}
					className={cn(styles.textArea, {
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
		);
	}
);

export default TextArea;
