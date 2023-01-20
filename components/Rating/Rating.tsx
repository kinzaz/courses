import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import {
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
	useRef,
} from 'react';
import StartIcon from './Star.svg';

const Rating = forwardRef(
	(
		{
			isEditable = false,
			rating,
			error,
			tabIndex,
			setRating,

			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) return -1;
			if (!rating && i == 0) {
				return tabIndex ?? 0;
			}
			if (r == i + 1) {
				return tabIndex ?? 0;
			}
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArr = ratingArray.map((r: JSX.Element, i: number) => (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable,
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
					tabIndex={computeFocus(rating, i)}
					onKeyDown={e => handleKey(e)}
					ref={r => ratingArrayRef.current?.push(r)}
					role={isEditable ? 'slider' : ''}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-valuemin={1}
					aria-invalid={error ? true : false}
					aria-label={isEditable ? 'Укажите рейтинг' : `Рейтинг + ${rating}`}
				>
					<StartIcon />
				</span>
			));
			setRatingArray(updatedArr);
		};

		const handleKey = (e: KeyboardEvent) => {
			if (!isEditable || !setRating) return;
			if (e.code == 'ArrowRight' || e.code === 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		const changeDisplay = (i: number) => {
			if (!isEditable) return;
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) return;
			setRating(i);
		};

		return (
			<div
				className={cn({
					[styles.starError]: error,
				})}
				ref={ref}
				{...props}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span role="alert" className={styles.error}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);

export default Rating;
