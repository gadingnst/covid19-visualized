import { FunctionComponent } from 'react'
import Link from 'next/link'
import { Button, Card, Chart } from 'components'
import { getPercentage, dateFormat, useFetch, API_BASEURL } from 'utils'
import { Summary } from 'typings/api'

export default (() => {
    const { data, loading } = useFetch<Summary>(API_BASEURL)
    
    const summary = !data ? {} : {
        confirmed: data.confirmed.value,
        recovered: data.recovered.value,
        deaths: data.deaths.value
    }

    return (
        <>
            <div className="text-center my-12">
                <h1 className="my-2">Summary</h1>
                <h6>Last updatated at: {!loading ? dateFormat(data.lastUpdate, true) : 'Loading...'}</h6>
            </div>

            <div className="divider-line" />

            <div id="summary" className="font is-weight-bold my-24">
                <div className="summary-data text-shadow text-center color is-theme-txt-dark">
                    {loading ? <h2>Loading Summary...</h2> : (
                        Object.entries(summary).map(([key, value], idx) => (
                            <div key={idx} className="summary-item p-8">
                                <Card
                                    header={<h4>{key.toUpperCase()}</h4>}
                                    className={`color is-bg-${
                                        key === 'confirmed'
                                            ? 'warning'
                                            : key === 'recovered'
                                                ? 'success'
                                                : 'danger'}
                                    `}
                                >
                                    {`${value} (${key === 'confirmed' ? 'infected' : getPercentage(value, data.confirmed.value)})`}
                                </Card>
                            </div>
                        ))
                    )}
                </div>
                <div id="chart" className="summary-data">
                    {data && (
                        <Chart
                            confirmed={summary.confirmed}
                            recovered={summary.recovered}
                            deaths={summary.deaths}
                        />
                    )}
                </div>
            </div>

            <div className="btn-link mb-24">
                <Link href="/details">
                    <Button block color="primary" text="Go to details page" />
                </Link>
            </div>
            
            <style jsx>{`
                #summary {
                    display: flex;
                    
                    .summary-data {
                        flex: 1;
                        
                        &#chart {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: auto;
                        }
                    }
                }
                
                @media screen and (max-width: 680px) {
                    #summary {
                        flex-direction: column-reverse;
                    }
                }
            `}</style>
        </>
    )
}) as FunctionComponent
