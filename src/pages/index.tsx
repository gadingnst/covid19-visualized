import { FunctionComponent, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import {
    Button,
    Card,
    ScrollableList,
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
    legends,
    dateFormat,
    getPercentage,
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
            .map((item, idx) => ({
                ...item,
                confirmed: idx === 0
                    ? item.totalConfirmed
                    : item.totalConfirmed - data[idx - 1].totalConfirmed,
                recovered: idx === 0
                    ? item.totalRecovered
                    : item.totalRecovered - data[idx - 1].totalRecovered
            }))
            .sort(({ reportDate: prev }, { reportDate: next }) => next - prev)
    )

    return (
        <ScrollableList<DailyType> title="Daily Update" data={data} loading={loading}>
            {daily => (
                <Card
                    className="text-center"
                    header={<h5 className="text-center">{dateFormat(daily.reportDateString)}</h5>}
                    footer={
                        <>
                            <h3>Total</h3>
                            <div className="divider-line mt-2 mb-4" style={{ width: '30%' }} />
                            <p>Confirmed: <span className="font is-weight-bold color is-txt-warning">{daily.totalConfirmed || 0}</span></p>
                            <p>Recovered: <span className="font is-weight-bold color is-txt-success">{daily.totalRecovered || 0} ({getPercentage(daily.totalRecovered, daily.totalConfirmed)})</span></p>
                        </>
                    }
                >
                    <p>Confirmed: <span className="font is-weight-bold color is-txt-warning">{daily.confirmed}</span></p>
                    <p>Recovered: <span className="font is-weight-bold color is-txt-success">{daily.recovered}</span></p>
                </Card>
            )}
        </ScrollableList>
    )
}

export default (() => {
    const { data } = useFetch<Country[]>(API_BASEURL + 'confirmed')()

    useEffect(() => {
        data && visualize('world-visualization', data)
    }, [data])

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
            <div className="card world-visualization-container my-8">
                <div id="tooltip" />
                <div id="world-visualization" />
                <div id="legends" className="color is-theme-txt-dark px-12 my-12">
                    <h4 className="my-4 px-8">Legends</h4>
                    {legends.map(({ color, value }) => (
                        <div key={color} className="legends-item font is-size-small">
                            <div className="legends-detail">{value === 0 ? `No infected` : `${value} or more infected`}</div>
                            <div className="legends-color mx-4" style={{ backgroundColor: color }} />
                        </div>
                    ))}
                </div>
            </div>

            <Daily />
            
            <style jsx>{`
                .world-visualization-container {
                    width: 100%;
                    background-color: #0299ff;
                    border-radius: 5px;
                    overflow: hidden;
                    
                    #world-visualization {
                        width: auto;
                        overflow-y: hidden;
                        overflow-x: auto;

                        svg {
                            width: 100%;
                            height: 100%;
                            position: center;
                            background-color: #2B65EC;
                        }
                    }

                    #legends {
                        flex: 1;
                        flex-direction: column;
                        justify-content: flex-end;
                        text-align: right;

                        .legends-item {
                            display: flex;
                            flex-direction: row;
                            align-items: stretch;
                            
                            .legends-color {
                                flex: .5;
                                width: 20px;
                                height: 20px;
                                border-radius: 5px;
                                margin: 5px;
                                align-items: center;
                            }

                            .legends-detail {
                                flex: 10;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                            }
                        }
                    }
                    
                    #tooltip {
                        color: #222; 
                        background: #fff; 
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px 0px #a6a6a6;
                        padding: 2px;
                        text-shadow: #f5f5f5 0 1px 0;
                        opacity: .9;
                        position: absolute;
                        z-index: 1;
                        
                        &.hidden {
                            display: none;
                        }
                    }
                }
            `}</style>
        </>
    )
}) as NextPage
