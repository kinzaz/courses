import cn from 'classnames';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';
import UpIcon from './Up.svg';

const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.div
			animate={controls}
			initial={{ opacity: 0 }}
			className={styles.up}
		>
			<ButtonIcon
				aria-label="Наверх"
				appearance="primary"
				icon="up"
				onClick={scrollToTop}
			/>
		</motion.div>
	);
};

export default Up;
