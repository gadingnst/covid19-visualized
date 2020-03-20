import Head from 'next/head'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Search, Button, Detail, FlexList } from 'components'
import { useFetch, API_BASEURL, useCounter } from 'utils'
import { Country } from 'typings/api'

export default (() => {
    const sortAZ = ({ countryRegion: prev }, { countryRegion: next }) => (next > prev) ? -1 : 1
    
    const countries = useFetch<Country[]>(
        `${API_BASEURL}/confirmed`,
        {},
        data => data.sort(sortAZ)
    )

    const [keyword, setKeyword] = useState<string>('')
    const [data, setData] = useState<Country[]>([])
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const dataCount = useCounter(countries.data, 6)
    const filterCount = useCounter(filteredCountries, 6)

    const onSearch = (value: string): void => {
        setKeyword(value.toLowerCase())
    }

    const onShowMore = () => filteredCountries.length
        ? filterCount.increase()
        : dataCount.increase()

    useEffect(() => {
        dataCount.counter > 0 && setData(
            countries.data.slice(0, dataCount.counter)
        )
    }, [dataCount.counter])

    useEffect(() => {
        filterCount.counter > 0 && setData(
            filteredCountries.slice(0, filterCount.counter)
        )
    }, [filterCount.counter])

    useEffect(() => {
        if (keyword.length) {
            dataCount.counter > 6 && dataCount.reset(6)
            setData(filteredCountries.slice(0, filterCount.counter))
        } else {
            countries.data && setData(
                countries.data.slice(0, dataCount.counter)
            )
        }
    }, [filteredCountries])

    useEffect(() => {
        if (keyword.length) {
            const filterByKeywords = countries.data.filter(country => {
                const region = country.countryRegion
                const province = country.provinceState
                return region.toLowerCase().includes(keyword)
                    || (province ? province.toLowerCase().includes(keyword) : false)
            })
            setFilteredCountries(filterByKeywords)
        } else {
            setFilteredCountries([])
        }
    }, [keyword])

    const renderShowMore = () => {
        if (countries.data) {
            const maxFilterData = filteredCountries.length && data.length === filteredCountries.length
            const maxData = data.length === countries.data.length
            const match = data.length + filteredCountries.length > 0

            if (!(maxFilterData || maxData) && match) {
                return (
                    <Button
                        block
                        text="Show more..."
                        color="primary"
                        onClick={onShowMore}
                    />
                )
            }
        }
        return null
    }

    return (
        <>
            <Head>
                <title>Details | COVID-19 Visualized (By: Sutan Nasution.)</title>
            </Head>

            <div className="text-center my-12">
                <h1 className="my-2">Details Country</h1>
                <h6></h6>
            </div>

            <div className="divider-line mb-32" />
            
            <div className="btn-link mb-24">
                <Link href="/">
                    <Button block color="primary" text="< Back to home" />
                </Link>
            </div>

            <Search
                block
                disabled={countries.loading}
                className="p-12"
                placeholder={countries.loading ? 'Loading...' : 'Search country state or province... (eg: indonesia)'}
                onChange={onSearch}
            />

            {countries.loading && <h2 className="text-center my-8">Loading...</h2>}

            {data.length ? (
                <FlexList<Country> data={data} wrapperClass="my-12" itemClass="my-12">
                    {country => <Detail country={country} />}
                </FlexList>
            ) : (
                <h3 className="text-center my-24">{
                    keyword.length
                        ? `No matching country or province "${keyword}" found.`
                        : 'Please type the name of the country that you want to search.'
                }</h3>
            )}

            {renderShowMore()}
        </>
    )
}) as NextPage
