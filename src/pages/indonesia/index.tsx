import { FunctionComponent } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { IDFormat, IDDaily, IDSummary } from 'typings/api'

import {
    Card,
    Button,
    Summary as SummaryComponent,
    Daily as DailyComponent
} from 'components'

import {
    useFetch,
    dateFormat,
    getPercentage,
    metaGenerator,
    API_INDONESIA
} from 'utils'

const meta = metaGenerator({
    title: 'Indonesia Update | COVID-19 Visualized (By: Sutan Nasution.)',
    description: 'COVID-19 daily update for Indonesia region',
    keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona, indonesia, kasus indonesia'
})

const Summary: FunctionComponent = () => {
    const { data, loading } = useFetch<IDSummary>(API_INDONESIA)

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
    const { data, loading } = useFetch<IDFormat<IDDaily[]>>(
        API_INDONESIA + 'harian',
        {},
        data => {
            data.data = data.data
                .map((item, idx) => ({
                    ...item,
                    jumlahPasienSembuhPerHari: idx === 0
                        ? item.jumlahPasienSembuh
                        : item.jumlahPasienSembuh - data.data[idx - 1].jumlahPasienSembuh,
                    jumlahPasienMeninggalPerHari: idx === 0
                        ? item.jumlahPasienMeninggal
                        : item.jumlahPasienMeninggal - data.data[idx - 1].jumlahPasienMeninggal,
                }))
                .sort(({ tanggal: prev }, { tanggal: next }) => next - prev)
            return data
        }
    )

    return (
        <DailyComponent<IDDaily> loading={loading} data={data?.data}>
            {data => (
                <Card
                    className="text-center flex-stretch"
                    header={<h5 className="text-center">(Hari ke-#{data.harike}) {dateFormat(data.tanggal)}</h5>}
                    footer={
                        <div className="total">
                            <p>Total Positif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahKasusKumulatif || 0}</span></p>
                            <p>Total Aktif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahpasiendalamperawatan || 0} ({getPercentage(data.jumlahpasiendalamperawatan, data.jumlahKasusKumulatif)})</span></p>
                            <p>Total Sembuh: <span className="font is-weight-bold color is-txt-success">{data.jumlahPasienSembuh || 0} ({getPercentage(data.jumlahPasienSembuh, data.jumlahKasusKumulatif)})</span></p>
                            <p>Total Meninggal: <span className="font is-weight-bold color is-txt-danger">{data.jumlahPasienMeninggal || 0} ({getPercentage(data.jumlahPasienMeninggal, data.jumlahKasusKumulatif)})</span></p>
                        </div>
                    }
                >
                    <div className="daily">
                        <p>Positif: <span className="font is-weight-bold color is-txt-warning">{data.jumlahKasusBaruperHari || 0}</span></p>
                        <p>Sembuh: <span className="font is-weight-bold color is-txt-success">{data.jumlahPasienSembuhPerHari || 0}</span></p>
                        <p>Meninggal: <span className="font is-weight-bold color is-txt-danger">{data.jumlahPasienMeninggalPerHari || 0}</span></p>
                    </div>
                </Card>
            )}
        </DailyComponent>
    )
}

export default (() => (
    <>
        <Head>
            <title>Indonesia Daily Update | COVID-19 Visualized</title>
            {meta.map((props, idx) => <meta key={idx} {...props} />)}
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
