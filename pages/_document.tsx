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
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
