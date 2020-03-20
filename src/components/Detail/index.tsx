import { FunctionComponent, useState } from 'react'
import { Card, Chart, Button } from 'components'
import { dateFormat, getActiveCase, getPercentage } from 'utils'
import { Country } from 'typings/api'
import './style.scss'

interface PropTypes {
    country: Country
}

export default (({ country }) => {
    const [chart, showChart] = useState<boolean>(false)

    return (
        <Card
            footer={
                <p className="font is-size-small text-center mt-12">
                    Last updated at: {dateFormat(country.lastUpdate, true)}
                </p>
            }
            header={
                <h2 className="text-center">{
                    country.provinceState
                        ? `${country.provinceState}, ${country.countryRegion}`
                        : country.countryRegion
                }</h2>
            }
        >
            <div className="country-content">
                {chart && (
                    <Chart
                        confirmed={country.confirmed}
                        recovered={country.recovered}
                        deaths={country.deaths}
                    />
                )}
                <div className="country-details text-center my-8">
                    <p>Total Confirmed: <span className="font is-weight-bold color is-txt-warning">{country.confirmed}</span></p>
                    <p>Active: <span className="font is-weight-bold color is-txt-warning">{getActiveCase(country)} ({getPercentage(getActiveCase(country), country.confirmed)})</span></p>
                    <p>Recovered: <span className="font is-weight-bold color is-txt-success">{country.recovered} ({getPercentage(country.recovered, country.confirmed)})</span></p>
                    <p>Deaths: <span className="font is-weight-bold color is-txt-danger">{country.deaths} ({getPercentage(country.deaths, country.confirmed)})</span></p>
                </div>
                <Button
                    block
                    color="primary"
                    text={`${chart ? 'Hide' : 'Show'} chart`}
                    className="mt-12"
                    onClick={() => showChart(!chart)}
                />
            </div>
        </Card>
    )
}) as FunctionComponent<PropTypes>
