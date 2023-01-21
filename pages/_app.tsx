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

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<Head>
				<title>MyTop</title>
				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
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
