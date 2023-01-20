import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './Sort.svg';
import styles from './Sort.module.css';
import cn from 'classnames';
import { KeyboardEvent } from 'react';

const Sort = ({
	setSort,
	sort,
	className,
	...props
}: SortProps): JSX.Element => {
	const handleKey = (e: KeyboardEvent, type: string) => {
		if (e.code == 'Enter' || e.code == 'Space') {
			e.preventDefault();
			if (type == 'rating') {
				setSort(SortEnum.Rating);
			}
			if (type == 'price') {
				setSort(SortEnum.Price);
			}
		}
	};

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id="sort">
				Сортировка
			</div>
			<span
				id="rating"
				tabIndex={0}
				onKeyDown={(e: KeyboardEvent) => handleKey(e, 'rating')}
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby="sort rating"
			>
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</span>
			<span
				id="price"
				tabIndex={0}
				onKeyDown={(e: KeyboardEvent) => handleKey(e, 'price')}
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby="sort price"
			>
				<SortIcon className={styles.sortIcon} />
				По цене
			</span>
		</div>
	);
};

export default Sort;
