import Head from 'next/head'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Card, Button, FlexList } from 'components'
import { IDFormat, IDCases } from 'typings/api'
import { useFetch, useCounter, dateFormat, metaGenerator, API_INDONESIA } from 'utils'

const meta = metaGenerator({
    title: 'Indonesia Case Details | COVID-19 Visualized (By: Sutan Nasution.)',
    description: 'COVID-19 cases in Indonesia region',
    keywords: 'covid19, corona virus, website, china, covid19 world, covid-19, corona, indonesia, kasus indonesia'
})

export default (() => {
    const [data, setData] = useState<IDCases[]>([])
    const cases = useFetch<IDFormat<IDCases[]>>(API_INDONESIA + 'kasus/old')
    const { counter, eventScroll } = useCounter(cases.data?.data, 6)

    useEffect(() => {
        cases.data && window.addEventListener('scroll', eventScroll)
        return () => {
            window.removeEventListener('scroll', eventScroll)
        }
    }, [cases.data])

    useEffect(() => {
        counter > 0 && setData(cases.data.data.slice(0, counter))
    }, [counter])

    return (
        <>
            <Head>
                <title>Indonesia Case Details | COVID-19 Visualized</title>
                {meta.map((props, idx) => <meta key={idx} {...props} />)}
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Indonesia Detail Cases</h1>
                <h6 className="color is-txt-warning">{cases.data?.warning}</h6>
            </div>

            <div className="divider-line" />

            <div className="btn-link my-24">
                <Link href="/indonesia">
                    <Button block color="secondary" text="< Back to Indonesia Cases" />
                </Link>
            </div>
            
            <div className="my-32">
                {!data.length ? <h3 className="text-center">Loading data...</h3> : (
                    <FlexList<IDCases> data={data} itemClass="my-8">
                        {data => (
                            <Card
                                className="text-center flex-stretch"
                                header={<h5 className="text-center">(#{data.no}) {data.kota ? `${data.kota}, ${data.provinsi}` : data.provinsi}</h5>}
                                footer={
                                    <span className="font is-size-small">
                                        {data.keterangan || 'Tidak ada keterangan'}; {data.dirawatdi ? `(Sedang dirawat di ${data.dirawatdi}); ` : ''}{data.kondisiKesehatan ? `Kodisi: ${data.kondisiKesehatan};` : ''}
                                    </span>
                                }
                            >
                                <div className="cases">
                                    <p>Usia: <span className="font is-weight-bold">{data.usia ? `${data.usia} tahun` : 'Tidak diketahui'}</span></p>
                                    <p>Jenis Kelamin: <span className="font is-weight-bold">{data.jk === 'P'
                                        ? 'Wanita'
                                        : data.jk === 'L'
                                            ? 'Pria'
                                            : 'Tidak diketahui'
                                    }</span></p>
                                    <p>Status: <span className={`font color is-weight-bold is-txt-${data.status === 'Aktif' ? 'warning' : data.status === 'Sembuh' ? 'success' : data.status === 'Meninggal' ? 'danger' : ''}`}>{data.status || 'Tidak diketahui'}</span></p>
                                    <p>Kluster: <span className="font is-weight-bold ">{data.kluster || 'Tidak diketahui'}</span></p>
                                    <p className="mt-8">Positif: <span className="font is-weight-bold">{data.positif ? dateFormat(+data.positif) : 'Tidak diketahui'}</span></p>
                                    <p>Mulai Gejala: <span className="font is-weight-bold">{data.mulaiGejala ? dateFormat(+data.mulaiGejala) : 'Tidak diketahui'}</span></p>
                                    <p>Mulai Di Isolasi: <span className="font is-weight-bold">{data.mulaiDiisolasi ? dateFormat(+data.mulaiDiisolasi) : 'Tidak diketahui'}</span></p>
                                </div>
                            </Card>
                        )}
                    </FlexList>
                )}
            </div>
        </>
    )
}) as NextPage
