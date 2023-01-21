import { useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { KeyboardEvent } from 'react';

const Menu = (): JSX.Element => {
	const { menu, firstCategory, setMenu } = useContext(AppContext);
	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
					when: 'beforeChildren',
					staggerChildren: 0.1,
			},
		},
		hidden: {
			marginBottom: 0,
		},
	};
	const variantsChildren = {
		visible: {
			opacity: 1,
			height: '100%',
			marginBottom: 15,
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: '0px',
			marginBottom: 0,
		},
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map(m => {
					if (m._id.secondCategory == secondCategory) {
						setAnnounce(m.isOpened ? 'closed' : 'opened');
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id == firstCategory && buildSecondsLevel(m)}
					</li>
				))}
			</ul>
		);
	};
	const buildSecondsLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<div>
								<button
									onKeyDown={(key: KeyboardEvent) =>
										openSecondLevelKey(key, m._id.secondCategory)
									}
									className={styles.secondLevel}
									onClick={() => openSecondLevel(m._id.secondCategory)}
									aria-expanded={m.isOpened}
								>
									{m._id.secondCategory}
								</button>
								<motion.ul
									className={cn(styles.secondLevelBlock)}
									layout
									variants={variants}
									initial={m.isOpened ? 'visible' : 'hidden'}
									animate={m.isOpened ? 'visible' : 'hidden'}
								>
									{buildThirdLevel(
										m.pages,
										menuItem.route,
										m.isOpened ?? false
									)}
								</motion.ul>
							</div>
						</li>
					);
				})}
			</ul>
		);
	};
	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return (
			<>
				{pages.map(page => (
					<motion.li key={page._id} variants={variantsChildren}>
						<Link
							tabIndex={isOpened ? 0 : -1}
							href={`/${route}/${page.alias}`}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]:
									`/${route}/${page.alias}` == router.asPath,
							})}
						>
							{page.category}
						</Link>
					</motion.li>
				))}
			</>
		);
	};

	return (
		<nav role={'navigation'} className={styles.menu}>
			{announce && (
				<span role={'log'} className="visually-hidden">
					{announce === 'opened' ? 'развернуто' : 'свернуто'}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};

export default Menu;
