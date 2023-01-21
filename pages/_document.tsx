import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	// static async getInitialProps(
	// 	ctx: DocumentContext
	// ): Promise<DocumentInitialProps> {
	// 	const initialProps = await Document.getInitialProps(ctx);

	// 	return initialProps;
	// }
	// for check

	render() {
		return (
			<Html lang="ru">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="preconnect" href="https://mc.yandex.ru" />
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
