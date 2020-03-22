import App from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import { Layout } from 'components'
import { metaGenerator } from 'utils'
import 'assets/styles/_bundle.scss'

export default class extends App {
    private meta = metaGenerator({
        title: 'COVID-19 Visualized',
        description: 'COVID-19 info update with data visualization',
        keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona, save earth, data corona, data covid19, ncov19, corona virus spread, virus'
    })

    public render() {
        const { Component, pageProps } = this.props
        return (
            <Layout>
                <Head>
                    <title>COVID-19 Visualized</title>
                    {this.meta}
                </Head>
                <NextNprogress color="#0292ff" height={2} />
                <div className="main-layout">
                    <Component  {...pageProps} />
                </div>
            </Layout>
        )
    }   
}
