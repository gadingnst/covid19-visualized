import { ReactNode, FunctionComponent } from 'react'
import { Chart, Card } from 'components'
import { getPercentage } from 'utils'
import { DataType as DataChart } from '../Chart'

interface PropTypes {
    loading: boolean
    data: DataChart
    children?: (key: string, value: number, data: DataChart) => ReactNode
}

export default (props => {
    return (
        <div id="summary" className="font is-weight-bold my-24">
            <div className="summary-data text-center">
                {props.loading ? <h3>Loading Summary...</h3> : (
                    Object.entries(props.data).map(([key, value], idx) => (
                        <div
                            key={idx}
                            className="summary-item text-shadow text-center color is-theme-txt-dark p-8"
                        >
                            {props.children ? props.children(key, value, props.data) : (
                                <Card
                                    header={<h4>TOTAL {key.toUpperCase()}</h4>}
                                    className={`color is-bg-${
                                        key === 'confirmed'
                                            ? 'warning'
                                            : key === 'recovered'
                                                ? 'success'
                                                : 'danger'}
                                    `}
                                >
                                    {`${value} (${key === 'confirmed'
                                        ? 'Positive infected'
                                        : getPercentage(value, props.data.confirmed)
                                    })`}
                                </Card>
                            )}
                        </div>
                    ))
                )}
            </div>
            
            <div id="chart" className="summary-data">
                {props.loading || (
                    <Chart
                        confirmed={props.data.confirmed}
                        recovered={props.data.recovered}
                        deaths={props.data.deaths}
                    />
                )}
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
        </div>
    )
}) as FunctionComponent<PropTypes>
