import cn from 'classnames';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';
import TextArea from '../TextArea/TextArea';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import CloseIcon from './Close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

const ReviewForm = ({
	productId,
	className,
	isOpened,
	...props
}: ReviewFormProps): JSX.Element => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setIsError] = useState<string>();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();
	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			);
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}
		} catch (error) {
			setIsError(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					error={errors.name}
					{...register('name', {
						required: { value: true, message: 'Заполните имя' },
					})}
					placeholder="Имя"
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					error={errors.title}
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок' },
					})}
					className={styles.title}
					placeholder={'Заголовок отзыва'}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								setRating={field.onChange}
								ref={field.ref}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<TextArea
					{...register('description', {
						required: { value: true, message: 'Заполните описание' },
					})}
					error={errors.description}
					placeholder="Текст отзыва"
					className={styles.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						onClick={() => clearErrors()}
						tabIndex={isOpened ? 0 : -1}
						appearance="primary"
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div role={'alert'} className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<button
						aria-label={'Закрыть оповещение'}
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{error && (
				<div role={'alert'} className={cn(styles.panel, styles.error)}>
					<span>Что-то пошло не так, попробуйте обновить страницу</span>
					<button
						aria-label={'Закрыть оповещение'}
						onClick={() => setIsError(undefined)}
						className={styles.close}
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};

export default ReviewForm;
