import Menu from '../Menu/Menu';
import { SidebarProps } from './Sidebar.props';
import Logo from '../Logo.svg';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<Search className={styles.search} />
			<Menu />
		</div>
	);
};

export default Sidebar;
