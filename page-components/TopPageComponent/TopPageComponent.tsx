import { Htag } from '../../components';
import Tag from '../../components/Tag/Tag';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import HhData from '../../components/hhData/HhData';
import { TopLevelCategory } from '../../interfaces/toppage.interface';
import Advantages from '../../components/Advantages/Advantages';
import Sort from '../../components/Sort/Sort';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sortReducer';
import Product from '../../components/Product/Product';
import { useReducedMotion } from 'framer-motion';

const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {
	const shouldReduceMotion = useReducedMotion();
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating,
		}
	);

	useEffect(() => {
		dispatchSort({ type: 'RESET', payload: products });
	}, [products]);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{sortedProducts && (
					<Tag
						color="gray"
						size="m"
						aria-label={sortedProducts.length + 'элементов'}
					>
						{sortedProducts.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts &&
					sortedProducts.map(p => (
						<Product
							layout={shouldReduceMotion ? false : true}
							product={p}
							key={p._id}
						/>
					))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Преимущества</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<Htag tag="h2">Получаемые навыки</Htag>
			{page.tags.map(tag => (
				<Tag key={tag} color={'primary'}>
					{tag}
				</Tag>
			))}
		</div>
	);
};

export default TopPageComponent;
