import App from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import { AppLayout } from 'components'
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
            <AppLayout>
                <Head>
                    <title>COVID-19 Visualized</title>
                    {this.meta}
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico" />
                    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
                    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
                </Head>
                
                <NextNprogress color="#0292ff" height={2} />
                
                <div className="main-layout">
                    <div className="mx-2 text-right">
                        <a href="https://ko-fi.com/B0B71P7PB" target="_blank">
                            <img style={{ border: 0, height: 36 }} src="https://cdn.ko-fi.com/cdn/kofi3.png?v=2" alt="Buy Me a Coffee at ko-fi.com" />
                        </a>
                    </div>
                    <Component  {...pageProps} />
                </div>
            </AppLayout>
        )
    }   
}
