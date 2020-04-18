import { FunctionComponent, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import {
    Button,
    Card,
    ScrollableList,
    Visualization,
    PageLayout,
    Summary as SummaryComponent
} from 'components'

import {
    Country,
    Summary as SummaryType,
    Daily as DailyType
} from 'typings/api'

import {
    useFetch,
    visualize,
    worldLegends,
    dateFormat,
    getPercentage,
    getPerDayStats,
    API_BASEURL
} from 'utils'

const Summary: FunctionComponent = () => {
    const { data, loading } = useFetch<SummaryType>(API_BASEURL)()

    return (
        <>
            <div className="text-center my-12">
                <h1 className="my-2">Summary</h1>
                <h6>Last updatated at: {!loading ? dateFormat(data.lastUpdate, true) : 'Loading...'}</h6>
            </div>

            <div className="divider-line" />

            <SummaryComponent
                loading={loading}
                data={{
                    confirmed: data?.confirmed.value,
                    recovered: data?.recovered.value,
                    deaths: data?.deaths.value
                }}
            />
        </>
    )
}

const Daily: FunctionComponent = () => {
    const { data, loading } = useFetch<DailyType[]>(API_BASEURL + 'daily')(
        data => data
            .map((item, index) => {
                item.confirmed.perDay = getPerDayStats({ data, index, stats: 'confirmed' })
                item.recovered.perDay = getPerDayStats({ data, index, stats: 'recovered' })
                item.deaths.perDay = getPerDayStats({ data, index, stats: 'deaths' })
                return item
            })
            .sort(({ reportDate: prev }, { reportDate: next }) => (
                new Date(next).getTime() - new Date(prev).getTime()
            ))
    )

    return (
        <ScrollableList<DailyType> title="Daily Update" data={data} loading={loading}>
            {daily => (
                <Card
                    className="text-center"
                    header={<h5 className="text-center">{dateFormat(daily.reportDate)}</h5>}
                    footer={
                        <>
                            <h3>Total</h3>
                            <div className="divider-line mt-2 mb-4" style={{ width: '30%' }} />
                            <p>Confirmed: <span className="font is-weight-bold color is-txt-warning">{daily.confirmed.total}</span></p>
                            {/* <p>Recovered: <span className="font is-weight-bold color is-txt-success">{daily.recovered.total} ({getPercentage(daily.recovered.total, daily.confirmed.total)})</span></p> */}
                            <p>Deaths: <span className="font is-weight-bold color is-txt-danger">{daily.deaths.total} ({getPercentage(daily.deaths.total, daily.confirmed.total)})</span></p>
                        </>
                    }
                >
                    <p>Confirmed: <span className="font is-weight-bold color is-txt-warning">{daily.confirmed.perDay}</span></p>
                    {/* <p>Recovered: <span className="font is-weight-bold color is-txt-success">{daily.recovered.perDay}</span></p> */}
                    <p>Deaths: <span className="font is-weight-bold color is-txt-danger">{daily.deaths.perDay}</span></p>
                </Card>
            )}
        </ScrollableList>
    )
}

const Page: NextPage = () => {
    const { data } = useFetch<Country[]>(API_BASEURL + 'confirmed')()

    return (
        <>
            <Summary />
            
            <div className="btn-link mb-24">
                <Link href="/region">
                    <Button block color="primary" text="See Country and Region Cases" />
                </Link>
                <Link href="/indonesia">
                    <Button className="mt-8" block color="danger" text="See Indonesia Cases" />
                </Link>
            </div>

            <h2 className="text-center mt-32 mb-12">World Visualization</h2>
            <Visualization
                id="world-visualization"
                data={data}
                visualize={visualize.world}
                legends={worldLegends.map(({ color, value }) => (
                    <div key={color} className="legends-item font is-size-small">
                        <div className="legends-detail">{value === 0 ? `No case infected` : `${value} or more cases infected`}</div>
                        <div className="legends-color mx-4" style={{ backgroundColor: color }} />
                    </div>
                ))}
            />
            
            <Daily />
        </>
    )
}

export default PageLayout(Page)
