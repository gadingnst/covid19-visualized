import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class extends Document {
    public static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await super.getInitialProps(ctx)
        return { ...initialProps }
    }

    public render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
