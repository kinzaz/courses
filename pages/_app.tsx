import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import '../styles/globals.css';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import Router from 'next/router';

Router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== 'undefined') {
		ym('hit', url);
	}
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>MyTop</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://mc.yandex.ru" />
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>
				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_DOMAIN + Router.asPath}
				/>
				<meta property="og:locale" content="ru_RU" />
			</Head>
			<YMInitializer
				accounts={[]}
				version={'2'}
				options={{ webvisor: true, defer: true }}
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
