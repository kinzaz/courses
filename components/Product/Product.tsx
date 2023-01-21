import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import Card from '../Card/Card';
import Rating from '../Rating/Rating';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';
import { decOfNum, priceRu } from '../../helpers/helpers';
import Divider from '../Divider/Divider';
import cn from 'classnames';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import Review from '../Review/Review';
import ReviewForm from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);
			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				reviewRef.current?.focus();
			};

			const variants = {
				visible: {
					opacity: 1,
					height: 'auto',
				},
				hidden: {
					opacity: 0,
					height: 0,
				},
			};

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<img
								src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
								alt={product.title}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span className="visually-hidden">Цена</span>
							{priceRu(product.price)}{' '}
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color="green">
									<span>
										<span className={'visually-hidden'}>Скидка</span>
										{priceRu(product.price - product.oldPrice)}
									</span>
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span className="visually-hidden">кредит</span>
							{priceRu(product.credit)}/
							<span className={styles.month}>мес</span>
						</div>
						<div className={styles.rating}>
							<span className="visually-hidden">{`Рейтинг + ${
								product.reviewAvg ?? product.initialRating
							}`}</span>
							<Rating rating={product.reviewAvg ?? product.initialRating} />
						</div>
						<div className={styles.tags}>
							{product.categories.map(c => (
								<Tag color="ghost" key={c} size="m" className={styles.category}>
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden={true}>
							Цена
						</div>
						<div className={styles.creditTitle}>Кредит </div>
						<div className={styles.rateTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{`${product.reviewCount}  ${decOfNum(product.reviewCount, [
									'отзыв',
									'отзыва',
									'отзывов',
								])}`}
							</a>
						</div>
						<Divider className={styles.hr} />
						<div className={styles.description}>{product.description}</div>
						<div className={styles.feature}>
							{product.characteristics.map(c => (
								<div className={styles.characteristics} key={c.name}>
									<span className={styles.characteristicsName}>{c.name}</span>
									<span className={styles.characteristicsDots}></span>
									<span className={styles.characteristicsValue}>{c.value}</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.actions}>
							<Button appearance="primary">Узнать подробнее</Button>
							<Button
								appearance="ghost"
								arrow={isReviewOpened ? 'down' : 'right'}
								className={styles.reviewButton}
								onClick={() => setIsReviewOpened(!isReviewOpened)}
								aria-expanded={isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial={'hidden'}
					>
						<Card
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}
							color="blue"
							className={styles.reviews}
						>
							{product.reviews.map(p => (
								<div key={p._id}>
									<Review review={p} />
									<Divider />
								</div>
							))}
							<ReviewForm productId={product._id} isOpened={isReviewOpened} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);

export default Product;
