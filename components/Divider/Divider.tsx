import { DividerProps } from './Divider.props';
import cn from 'classnames';
import styles from './Divider.module.css';

const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
	return <hr className={cn(styles.hr, className)} {...props} />;
};

export default Divider;
