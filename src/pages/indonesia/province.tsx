import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { DataSearch, Button, Region, FlexList } from 'components'
import { useFetch, dateFormat, getPercentage, getActiveCase, API_INDONESIA } from 'utils'
import { IDFormat, IDProvince } from 'typings/api'

const getActiveIDN = (data: IDProvince) => getActiveCase({
    confirmed: data.kasusTerkonfirmasiAkumulatif,
    recovered: data.kasusSembuhAkumulatif,
    deaths: data.kasusMeninggalAkumulatif
})

export default (() => {    
    const { data, loading } = useFetch<IDFormat<IDProvince[]>>(API_INDONESIA + 'provinsi')(
        data => {
            data.data = data.data.filter(({ kodeProvinsi }) => kodeProvinsi)
            return data
        }
    )

    return (
        <>
            <Head>
                <title>Indonesia Province | COVID-19 Visualized</title>
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Indonesia Province</h1>
            </div>

            <div className="divider-line mb-32" />
            
            <div className="btn-link mb-24">
                <Link href="/indonesia">
                    <Button block color="secondary" text="< Back to Indonesia Cases" />
                </Link>
            </div>

            <DataSearch<IDProvince>
                data={data?.data}
                loading={loading}
                searchPlaceholder="Search province... (eg: jakarta)"
                searchFilter={(keyword, item) => item.provinsi.toLowerCase().includes(keyword)}
            >
                {(data, keyword) => data.length
                    ? (
                        <FlexList<IDProvince> data={data} wrapperClass="my-12" itemClass="my-12">
                            {province => (
                                <Region
                                    chart={{
                                        confirmed: province.kasusTerkonfirmasiAkumulatif,
                                        recovered: province.kasusSembuhAkumulatif,
                                        deaths: province.kasusMeninggalAkumulatif
                                    }}
                                    header={`(#${province.kodeProvinsi}) ${province.provinsi}`}
                                    footer={`Last updated at: ${dateFormat(province.pembaruan)}`}
                                >
                                    <p>Total Positif: <span className="font is-weight-bold color is-txt-warning">{province.kasusTerkonfirmasiAkumulatif}</span></p>
                                    <p>Aktif: <span className="font is-weight-bold color is-txt-warning">{getActiveIDN(province)} ({getPercentage(getActiveIDN(province), province.kasusTerkonfirmasiAkumulatif)})</span></p>
                                    <p>Sembuh: <span className="font is-weight-bold color is-txt-success">{province.kasusSembuhAkumulatif} ({getPercentage(province.kasusSembuhAkumulatif, province.kasusTerkonfirmasiAkumulatif)})</span></p>
                                    <p>Meninggal: <span className="font is-weight-bold color is-txt-danger">{province.kasusMeninggalAkumulatif} ({getPercentage(province.kasusMeninggalAkumulatif, province.kasusTerkonfirmasiAkumulatif)})</span></p>
                                </Region>
                            )}
                        </FlexList>
                    ) : (
                        <h3 className="text-center my-24">{
                            keyword.length
                                ? `No matching province "${keyword}" found.`
                                : 'Please type the name of province that you want to search.'
                        }</h3>
                    )
                }
            </DataSearch>
        </>
    )
}) as NextPage
