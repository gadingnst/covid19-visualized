import { FunctionComponent } from 'react'
import Dynamic from 'next/dynamic'
import { getInCare } from 'utils'

const Chart = Dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <h2>Loading Chart...</h2>
})

interface PropTypes {
    confirmed: number
    recovered: number
    deaths: number
}

export default (props => (
    <Chart
        type="pie"
        width="350px"
        series={[getInCare(props), props.recovered, props.deaths]}
        options={{
            colors: ['#0292ff', '#0dc25c', '#fe2b5e'],
            labels: ['In Care', 'Recovered', 'Deaths'],
            dataLabels: {
                enabled: true,
                formatter: (percent: number, opts) => [
                    opts.w.globals.labels[opts.seriesIndex],
                    `(${percent.toFixed(2) + '%'})`
                ]
            },
            legend: {
                show: false
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
