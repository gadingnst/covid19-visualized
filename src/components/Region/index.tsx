import { ReactNode, useState, FunctionComponent } from 'react'
import { Card, Chart, Button } from 'components'
import { DataType as DataChart } from '../Chart'

interface PropTypes {
    chart: DataChart
    children: ReactNode
    header: ReactNode | string
    footer?: ReactNode | string
}

export default (props => {
    const { chart, children, header, footer } = props
    const [isShowChart, showChart] = useState<boolean>(false)

    return (
        <Card
            header={<h2 className="text-center">{header}</h2>}
            footer={!footer ? null : (
                <p className="font is-size-small text-center mt-12">
                    {footer}
                </p>
            )}
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
                    {children}
                </div>
                <Button
                    block
                    color={isShowChart ? 'secondary' : 'primary'}
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
}) as FunctionComponent<PropTypes>
