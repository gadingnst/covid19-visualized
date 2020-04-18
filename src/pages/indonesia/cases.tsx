import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { Button, Card, ScrollableList, PageLayout } from 'components'
import { IDFormat, IDCases } from 'typings/api'
import { useFetch, dateFormat, metaGenerator, API_INDONESIA } from 'utils'

const meta = metaGenerator({
    title: 'Indonesia Case Details | COVID-19 Visualized',
    description: 'COVID-19 cases in Indonesia region',
    keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona, indonesia, kasus indonesia'
})

const Page: NextPage = () => {
    const { data, loading } = useFetch<IDFormat<IDCases[]>>(API_INDONESIA + 'kasus/old')()

    return (
        <>
            <Head>
                <title>Indonesia Case Details | COVID-19 Visualized</title>
                {meta}
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Indonesia Detail Cases</h1>
                <h6 className="color is-txt-warning">{data?.warning}</h6>
            </div>

            <div className="divider-line" />

            <div className="btn-link my-24">
                <Link href="/indonesia">
                    <Button block color="secondary" text="< Back to Indonesia Cases" />
                </Link>
            </div>
            
            <ScrollableList<IDCases> title="Data Cases" data={data?.data} loading={loading}>
                {data => (
                    <Card
                        className="text-center"
                        header={<h5 className="text-center">(#{data.no}) {data.kota ? `${data.kota}, ${data.provinsi}` : data.provinsi}</h5>}
                        footer={
                            <span className="font is-size-small">
                                {data.keterangan || 'Tidak ada keterangan'}; {data.dirawatdi ? `(Sedang dirawat di ${data.dirawatdi}); ` : ''}{data.kondisiKesehatan ? `Kodisi: ${data.kondisiKesehatan};` : ''}
                            </span>
                        }
                    >
                        <p>Usia: <span className="font is-weight-bold">{data.usia ? `${data.usia} tahun` : 'Tidak diketahui'}</span></p>
                        <p>Jenis Kelamin: <span className="font is-weight-bold">{data.jk === 'P'
                            ? 'Wanita'
                            : data.jk === 'L'
                                ? 'Pria'
                                : 'Tidak diketahui'
                        }</span></p>
                        <p>Status: <span className={`font color is-weight-bold is-txt-${data.status === 'Aktif' ? 'warning' : data.status === 'Sembuh' ? 'success' : data.status === 'Meninggal' ? 'danger' : ''}`}>{data.status || 'Tidak diketahui'}</span></p>
                        <p>Kluster: <span className="font is-weight-bold ">{data.kluster || 'Tidak diketahui'}</span></p>
                        <p className="mt-8">Positif: <span className="font is-weight-bold">{data.positif ? dateFormat(+data.positif, false, 'id-ID') : 'Tidak diketahui'}</span></p>
                        <p>Mulai Gejala: <span className="font is-weight-bold">{data.mulaiGejala ? dateFormat(+data.mulaiGejala, false, 'id-ID') : 'Tidak diketahui'}</span></p>
                        <p>Mulai Di Isolasi: <span className="font is-weight-bold">{data.mulaiDiisolasi ? dateFormat(+data.mulaiDiisolasi, false, 'id-ID') : 'Tidak diketahui'}</span></p>
                    </Card>
                )}
            </ScrollableList>
        </>
    )
}

export default PageLayout(Page)
