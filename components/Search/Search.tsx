import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { KeyboardEvent, useState } from 'react';
import SearchIcon from './Search.svg';
import { useRouter } from 'next/router';

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();
	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};

	return (
		<form role={'search'} className={cn(className, styles.search)} {...props}>
			<Input
				placeholder="Поиск..."
				value={search}
				onChange={e => setSearch(e.target.value)}
				className={styles.input}
				onKeyDown={(e: KeyboardEvent) => handleKeyDown(e)}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
				aria-label="Искать по сайту"
			>
				<SearchIcon />
			</Button>
		</form>
	);
};

export default Search;
