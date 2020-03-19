import Head from 'next/head'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Search, Button, Card, Chart, FlexList } from 'components'
import { useFetch, getInCare, getPercentage, dateFormat, API_BASEURL } from 'utils'
import { Country } from 'typings/api'

export default (() => {
    const [keyword, setKeyword] = useState<string>('')
    const [data, setData] = useState<Country[]>([])
    const countries = useFetch<Country[]>(`${API_BASEURL}/confirmed`)
    const sortAZ = ({ countryRegion: prev }, { countryRegion: next }) => (next > prev) ? -1 : 1

    const onSearch = (value: string): void => {
        setKeyword(value.toLowerCase())
    }

    useEffect(() => {
        if (keyword.length) {
            const filterByKeywords = countries.data.filter(country => {
                const region = country.countryRegion
                const province = country.provinceState
                return region.toLowerCase().includes(keyword)
                    || (province ? province.toLowerCase().includes(keyword) : false)
            })
            setData(filterByKeywords.sort(sortAZ).slice(0, 6))
        } else {
            setData([])
        }
    }, [keyword])

    return (
        <>
            <Head>
                <title>Details | COVID-19 Visualized</title>
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Details Country</h1>
                <h6></h6>
            </div>

            <div className="divider-line mb-32" />
            
            <div className="btn-link mb-24">
                <Link href="/">
                    <Button block color="primary" text="Back to home" />
                </Link>
            </div>

            <Search
                block
                className="p-12"
                placeholder="Search country state or province..."
                onChange={onSearch}
            />

            {data.length ? (
                <FlexList<Country> data={data} wrapperClass="my-12" itemClass="my-12">
                    {country => (
                        <Card
                            footer={
                                <p className="font is-size-small text-center mt-12">
                                    Last updated at: {dateFormat(country.lastUpdate, true)}
                                </p>
                            }
                            header={
                                <h2 className="text-center">{
                                    country.provinceState
                                        ? `${country.provinceState}, ${country.countryRegion}`
                                        : country.countryRegion
                                }</h2>
                            }
                        >
                            <div className="country-content">
                                <Chart
                                    confirmed={country.confirmed}
                                    recovered={country.recovered}
                                    deaths={country.deaths}
                                />
                                <div className="country-details text-center">
                                    <p>Total Confirmed: <span className="color is-txt-warning">{country.confirmed}</span></p>
                                    <p>In Care: <span className="color is-txt-info">{getInCare(country)} ({getPercentage(getInCare(country), country.confirmed)})</span></p>
                                    <p>Recovered: <span className="color is-txt-success">{country.recovered} ({getPercentage(country.recovered, country.confirmed)})</span></p>
                                    <p>Deaths: <span className="color is-txt-danger">{country.deaths} ({getPercentage(country.deaths, country.confirmed)})</span></p>
                                </div>
                            </div>
                        </Card>
                    )}
                </FlexList>
            ) : (
                <h3 className="text-center my-24">{
                    keyword.length
                        ? `No matching country "${keyword}" found.`
                        : 'Please type the name of the country that you want to search. (eg: indonesia)'
                }</h3>
            )}
            <style jsx>{`
                .country-details {
                    width: 100%;
                }

                .country-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }    
            `}</style>
        </>
    )
}) as NextPage
