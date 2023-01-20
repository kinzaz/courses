import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag } from '../components';
import Button from '../components/Button/Button';
import Paragraph from '../components/Paragraph/Paragraph';
import Rating from '../components/Rating/Rating';
import Tag from '../components/Tag/Tag';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import Input from '../components/Input/Input';
import TextArea from '../components/TextArea/TextArea';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag="h1">Text</Htag>
			<Button arrow="right" appearance="primary">
				push
			</Button>
			<Paragraph size="14px">Маленький</Paragraph>
			<Paragraph size="16px">Средний</Paragraph>
			<Paragraph size="18px">Большой</Paragraph>
			<Tag size="s">Маленький</Tag>
			<Tag size="m" color="red">
				Средний
			</Tag>
			<Tag size="s" color="gray">
				Средний
			</Tag>
			<Tag size="s" color="primary">
				Средний
			</Tag>
			<Rating rating={rating} setRating={setRating} isEditable />
			<Input />
			<TextArea />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
