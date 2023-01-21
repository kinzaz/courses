import { GetStaticProps } from 'next';
import { Htag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { useStats } from '../hooks/useStats';

function Home({ menu }: HomeProps): JSX.Element {
	const { secondData } = useStats(menu);

	return (
		<>
			<Htag tag="h1">Изучи профессию на OwlTop</Htag>
			<div>{menu.length} различных направлений</div>
			<div>{secondData} разделов</div>
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
