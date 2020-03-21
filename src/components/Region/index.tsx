import { ReactNode, useState } from 'react'
import { Card, Chart, Button } from 'components'
import { DataType as DataChart } from '../Chart'

interface PropTypes<TData> {
    data: TData
    chart: DataChart
    children: (data: TData) => ReactNode
    header: (data: TData) => ReactNode
    footer: (data: TData) => ReactNode
}

export default <Data extends object>(props: PropTypes<Data>) => {
    const { data, chart, children, header, footer } = props
    const [isShowChart, showChart] = useState<boolean>(false)

    return (
        <Card
            header={<h2 className="text-center">{header(data)}</h2>}
            footer={
                <p className="font is-size-small text-center mt-12">
                    {footer(data)}
                </p>
            }
        >
            <div className="region-content">
                {isShowChart && (
                    <Chart
                        confirmed={chart.confirmed}
                        recovered={chart.recovered}
                        deaths={chart.deaths}
                    />
                )}
                <div className="region-details text-center my-8">
                    {children(data)}
                </div>
                <Button
                    block
                    color="primary"
                    text={`${isShowChart ? 'Hide' : 'Show'} chart`}
                    className="mt-12"
                    onClick={() => showChart(!isShowChart)}
                />
            </div>

            <style jsx>{`
                .region-details {
                    width: 100%;
                }

                .region-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
            `}</style>
        </Card>
    )
}
