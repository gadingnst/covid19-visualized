import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { DataSearch, Button, Region, FlexList } from 'components'
import { useFetch, dateFormat, getPercentage, getActiveCase, API_BASEURL } from 'utils'
import { Country } from 'typings/api'

export default (() => {    
    const countries = useFetch<Country[]>(
        API_BASEURL + 'confirmed',
        {},
        data => data.sort(({ countryRegion: prev }, { countryRegion: next }) =>(next > prev) ? -1 : 1)
    )

    return (
        <>
            <Head>
                <title>Country and Region | COVID-19 Visualized</title>
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Country and Region</h1>
            </div>

            <div className="divider-line mb-32" />
            
            <div className="btn-link mb-24">
                <Link href="/">
                    <Button block color="secondary" text="< Back to Home" />
                </Link>
            </div>

            <DataSearch<Country>
                data={countries.data}
                loading={countries.loading}
                searchPlaceholder="Search country state or province... (eg: indonesia)"
                searchFilter={(keyword, item) => {
                    const region = item.countryRegion.toLowerCase()
                    const province = item.provinceState?.toLowerCase()
                    return region.includes(keyword) || (province ? province.includes(keyword) : false)
                }}
            >
                {(data, keyword) => data.length
                    ? (
                        <FlexList<Country> data={data} wrapperClass="my-12" itemClass="my-12">
                            {country => (
                                <Region<Country>
                                    data={country}
                                    chart={{
                                        confirmed: country.confirmed,
                                        recovered: country.recovered,
                                        deaths: country.deaths
                                    }}
                                    header={data => (
                                        data.provinceState
                                            ? `${data.provinceState}, ${data.countryRegion}`
                                            : data.countryRegion
                                    )}
                                    footer={({ lastUpdate }) => `Last updated at: ${dateFormat(lastUpdate, true)}`}
                                >
                                    {data => (
                                        <>
                                            <p>Total Confirmed: <span className="font is-weight-bold color is-txt-warning">{data.confirmed}</span></p>
                                            <p>Active: <span className="font is-weight-bold color is-txt-warning">{getActiveCase(data)} ({getPercentage(getActiveCase(data), data.confirmed)})</span></p>
                                            <p>Recovered: <span className="font is-weight-bold color is-txt-success">{data.recovered} ({getPercentage(data.recovered, data.confirmed)})</span></p>
                                            <p>Deaths: <span className="font is-weight-bold color is-txt-danger">{data.deaths} ({getPercentage(data.deaths, data.confirmed)})</span></p>
                                        </>
                                    )}
                                </Region>
                            )}
                        </FlexList>
                    ) : (
                        <h3 className="text-center my-24">{
                            keyword.length
                                ? `No matching country or province "${keyword}" found.`
                                : 'Please type the name of the country that you want to search.'
                        }</h3>
                    )
                }
            </DataSearch>
        </>
    )
}) as NextPage
