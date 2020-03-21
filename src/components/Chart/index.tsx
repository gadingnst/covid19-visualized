import { FunctionComponent } from 'react'
import Dynamic from 'next/dynamic'
import { getActiveCase } from 'utils'

const Chart = Dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <h3 className="py-12">Loading Chart...</h3>
})

export interface DataType {
    confirmed: number
    recovered: number
    deaths: number
}

interface PropTypes {
    confirmed: number
    recovered: number
    deaths: number
    showLegend?: boolean
}

export default (props => (
    <Chart
        type="pie"
        width="350px"
        series={[getActiveCase(props), props.recovered, props.deaths]}
        options={{
            colors: ['#fec60d', '#0dc25c', '#fe2b5e'],
            labels: ['Active', 'Recovered', 'Deaths'],
            dataLabels: {
                enabled: true,
                formatter: (percent: number, opts) => [
                    opts.w.globals.labels[opts.seriesIndex],
                    `(${percent.toFixed(2) + '%'})`
                ]
            },
            legend: {
                show: props.showLegend || false
            },
            responsive: [{
                breakpoint: 820,
                options: {
                    chart: {
                        width: '100%'
                    }
                }
            }]
        }}
    />
)) as FunctionComponent<PropTypes>
