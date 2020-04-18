import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { IDFormat, IDProvince } from 'typings/api'
import { DataSearch, Button, Region, FlexList } from 'components'

import {
    useFetch,
    getActiveCaseID,
    metaGenerator,
    API_INDONESIA
} from 'utils'

const meta = metaGenerator({
    title: 'Indonesia Case Details | COVID-19 Visualized',
    description: 'COVID-19 cases in Indonesia region',
    keywords: 'covid19, corona viral, corona virus, website, china, covid19 world, covid-19, corona, indonesia, kasus indonesia'
})

export default (() => {    
    const { data, loading } = useFetch<IDFormat<IDProvince[]>>(API_INDONESIA + 'provinsi')(
        data => {
            data.data = data.data.filter(({ kodeProvi }) => kodeProvi)
            return data
        }
    )

    return (
        <>
            <Head>
                <title>Indonesia Province | COVID-19 Visualized</title>
                {meta}
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
                                        confirmed: province.kasusPosi,
                                        recovered: province.kasusSemb,
                                        deaths: province.kasusMeni
                                    }}
                                    header={`(#${province.kodeProvi}) ${province.provinsi}`}
                                >
                                    <p>Total Positif: <span className="font is-weight-bold color is-txt-warning">{province.kasusPosi}</span></p>
                                    <p className="mt-8">Aktif: <span className="font is-weight-bold color is-txt-warning">{getActiveCaseID(province)}</span></p>
                                    <p>Sembuh: <span className="font is-weight-bold color is-txt-success">{province.kasusSemb}</span></p>
                                    <p>Meninggal: <span className="font is-weight-bold color is-txt-danger">{province.kasusMeni}</span></p>
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
