import { FunctionComponent } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { IDFormat, IDDaily, IDSummary } from 'typings/api'

import {
    Card,
    Button,
    ScrollableList,
    Summary as SummaryComponent
} from 'components'

import {
    useFetch,
    dateFormat,
    getPercentage,
    getPerDayStats,
    metaGenerator,
    API_INDONESIA
} from 'utils'

const meta = metaGenerator({
    title: 'Indonesia Update | COVID-19 Visualized',
    description: 'COVID-19 daily update for Indonesia region',
    keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona, indonesia, kasus indonesia, corona viral'
})

const Summary: FunctionComponent = () => {
    const { data, loading } = useFetch<IDSummary>(API_INDONESIA)()

    return (
        <SummaryComponent
            loading={loading}
            data={{
                confirmed: data?.jumlahKasus,
                recovered: data?.sembuh,
                deaths: data?.meninggal
            }}
        />
    )
}

const Daily: FunctionComponent = () => {
    const { data, loading } = useFetch<IDFormat<IDDaily[]>>(API_INDONESIA + 'harian')(
        data => {
            data.data = data.data
                .filter(({ jumlahKasusKumulatif }) => jumlahKasusKumulatif)
                .sort(({ tanggal: prev }, { tanggal: next }) => next - prev)
            return data
        }
    )

    return (
        <ScrollableList<IDDaily> title="Daily Update" loading={loading} data={data?.data}>
            {data => (
                <Card
                    className="text-center"
                    header={<h5 className="text-center">(Hari ke-#{data.harike}) {dateFormat(data.tanggal, false, 'id-ID')}</h5>}
                    footer={
                        <>
                            <h3>Akumulasi</h3>
                            <div className="divider-line mt-2 mb-4" style={{ width: '30%' }} />
                            <p>Positif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahKasusKumulatif}</span></p>
                            <p>Aktif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahpasiendalamperawatan} ({getPercentage(data.jumlahpasiendalamperawatan, data.jumlahKasusKumulatif)})</span></p>
                            <p>Sembuh: <span className="font is-weight-bold color is-txt-success">{data.jumlahPasienSembuh} ({getPercentage(data.jumlahPasienSembuh, data.jumlahKasusKumulatif)})</span></p>
                            <p>Meninggal: <span className="font is-weight-bold color is-txt-danger">{data.jumlahPasienMeninggal} ({getPercentage(data.jumlahPasienMeninggal, data.jumlahKasusKumulatif)})</span></p>
                        </>
                    }
                >
                    <p>Positif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahKasusBaruperHari}</span></p>
                    <p>Sembuh: <span className="font is-weight-bold color is-txt-success">{data.jumlahKasusSembuhperHari}</span></p>
                    <p>Meninggal: <span className="font is-weight-bold color is-txt-danger">{data.jumlahKasusMeninggalperHari}</span></p>
                </Card>
            )}
        </ScrollableList>
    )
}

export default (() => (
    <>
        <Head>
            <title>Indonesia Daily Update | COVID-19 Visualized</title>
            {meta}
        </Head>

        <div className="text-center my-12">
            <h1 className="my-2">Indonesia Update</h1>
        </div>

        <div className="divider-line" />

        <Summary />

        <div className="btn-link my-24">
            <Link href="/indonesia/province">
                <Button className="my-4" block color="primary" text="See Province Cases" />
            </Link>
            <Link href="/indonesia/cases">
                <Button className="my-4" block color="success" text="See Case details" />
            </Link>
            <Link href="/">
                <Button className="my-4" block color="secondary" text="< Back to Home" />
            </Link>
        </div>

        <Daily />
    </>
)) as NextPage
