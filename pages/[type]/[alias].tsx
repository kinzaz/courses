import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import {
	TopLevelCategory,
	TopPageModel,
} from '../../interfaces/toppage.interface';
import { ParsedUrlQuery } from 'querystring';
import { productModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import TopPageComponent from '../../page-components/TopPageComponent/TopPageComponent';
import { API } from '../../helpers/api';
import Head from 'next/head';

function TopPage({ products, page, firstCategory }: TopPageProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{page.title}</title>
				<meta name="description" content={page.metaDescription} />
				<meta property="og:title" content={page.metaTitle} />
				<meta property="og:type" content="article" />
				<meta property="og:description" content={page.metaDescription} />
			</Head>
			<TopPageComponent
				products={products}
				page={page}
				firstCategory={firstCategory}
			/>
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m.id,
		});
		paths = paths.concat(
			menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`))
		);
	}
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id,
		});
		if (menu.length == 0) {
			return {
				notFound: true,
			};
		}
		const { data: page } = await axios.get<TopPageModel>(
			API.topPage.byAlias + params.alias
		);
		const { data: products } = await axios.post<productModel[]>(
			API.product.find,
			{
				category: page.category,
				limit: 10,
			}
		);
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: productModel[];
}
