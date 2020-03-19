import { FunctionComponent, useState, useEffect } from 'react'
import { useFetch, useCounter, dateFormat, getPercentage, API_BASEURL } from 'utils'
import { Card, FlexList } from 'components'
import { Daily } from 'typings/api'

export default (() => {
    const [daily, setDaily] = useState<Daily[]>([])
    const { data } = useFetch<Daily[]>(`${API_BASEURL}/daily`)
    const { counter, eventScroll } = useCounter(data, 6)

    const newest = ({ reportDate: prev }, { reportDate: next }) => next - prev

    useEffect(() => {
        data && window.addEventListener('scroll', eventScroll)
        return () => {
            window.removeEventListener('scroll', eventScroll)
        }
    }, [data])

    useEffect(() => {
        counter > 0 && setDaily(data
            .map((dataItem, idx) => ({
                ...dataItem,
                confirmed: idx === 0
                    ? dataItem.totalConfirmed
                    : dataItem.totalConfirmed - data[idx - 1].totalConfirmed,
                recovered: idx === 0
                    ? dataItem.totalRecovered
                    : dataItem.totalRecovered - data[idx - 1].totalRecovered
            }))
            .sort(newest)
            .slice(0, counter)
        )
    }, [counter])

    return (
        <div className="my-32">
            <h2 className="text-center my-12">{data ? 'Daily Update' : 'Loading Daily Update...'}</h2>
            <FlexList<Daily> data={daily} itemClass="my-8">
                {daily => (
                    <Card
                        className="text-center"
                        header={<h5 className="text-center">{dateFormat(daily.reportDateString)}</h5>}
                        footer={
                            <div className="total">
                                <p>Total Confirmed: <span className="color is-txt-danger">{daily.totalConfirmed || 0}</span></p>
                                <p>Total Recovered: <span className="color is-txt-success">{daily.totalRecovered || 0} ({getPercentage(daily.totalRecovered, daily.totalConfirmed)})</span></p>
                            </div>
                        }
                    >
                        <div className="daily-infected">
                            <p>Confirmed: <span className={`color is-txt-${daily.recovered >= 0 ? 'danger' : 'info'}`}>{daily.confirmed}</span></p>
                            <p>Recovered: <span className="color is-txt-success">{daily.recovered}</span></p>
                        </div>
                    </Card>
                )}
            </FlexList>
        </div>
    )
}) as FunctionComponent
