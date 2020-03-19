import Head from 'next/head'
import { Layout } from 'components'
import { metaGenerator } from 'utils'
import 'assets/styles/_bundle.scss'

const meta = metaGenerator({
    title: 'COVID-19 Visualized',
    description: 'COVID-19 info update with data visualization',
    keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona'
})

export default ({ Component, pageProps }) => {
    return (
        <Layout>
            <Head>
                <title>COVID-19 Visualized</title>
                {meta.map((props, idx) => <meta key={idx} {...props} />)}
            </Head>
            <div className="main-layout">
                <Component  {...pageProps} />
            </div>
        </Layout>
    )
}
