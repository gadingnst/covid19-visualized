import * as D3 from 'd3'
import * as TopoJSON from 'topojson-client'
import Color from 'color'
import { getPercentage, getActiveCase } from 'utils'
import { Country } from 'typings/api'

interface Legend {
    color: string
    value: number
}

export const legends: Legend[] = [
    { color: '#730707', value: 10001 },
    { color: '#B90A0A', value: 5001 },
    { color: '#FF0000', value: 501 },
    { color: '#F16F16', value: 51 },
    { color: '#F1C316', value: 26 },
    { color: '#FDF211', value: 1 },
    { color: '#3AFF00', value: 0 }
]

const tooltipHtml = (data: Country): string => `
    <div id="covid19-tooltip">
        <h3 class="text-center my-2">${data.name}</h3>
        <h5>Confirmed: ${data.confirmed}</h5>
        <h5>Active: ${getActiveCase(data)} (${getPercentage(getActiveCase(data), data.confirmed)})</h5>
        <h5>Recovered: ${data.recovered} (${getPercentage(data.recovered, data.confirmed)})</h5>
        <h5>Deaths: ${data.deaths} (${getPercentage(data.deaths, data.confirmed)})</h5>
    </div>
`

export default (id: string, data: Country[]): Promise<any> => {
    const tooltip = D3.select('div.tooltip')
    
    const svg = D3.select(`#${id}`)
        .append('svg')
        .attr('width', 960)
        .attr('height', 520)
    
    const path = D3.geoPath().projection(
        (D3.geoNaturalEarth1() 
            .rotate([-9, 0]) as any)
            .scale([1300 / (2 * Math.PI)])
            .translate([450, 300])
    )

    return Promise.all([D3.json('/dataset/world-110m.json'), D3.csv('/dataset/world-country.csv')])
        .then(([world, countries]) => {
            const worldFeatures: Country[] | any[] = ((TopoJSON.feature(world, world.objects.countries) as any)
                .features as any[])
                .reduce((acc: Country[], cur: Country) => {
                    const checkCountry = (countries as any[])
                        .some(country => cur.id === country.id && (
                            cur.name = country.name,
                            cur.iso3 = country['alpha-3']
                        ))
                    
                    if (checkCountry) {
                        const covid19Data: Country | boolean = data.find(country => country.iso3 === cur.iso3) || false
                        
                        acc.push(covid19Data
                            ? {
                                ...cur,
                                ...covid19Data,
                                name: covid19Data.countryRegion,
                                legend: legends.find(({ value }) => (
                                    covid19Data.confirmed > (value - 1)
                                )).color
                            } : {
                                ...cur,
                                confirmed: 0,
                                recovered: 0,
                                deaths: 0,
                                legend: legends.find(({ value }) => value === 0).color
                            })
                    }

                    return acc
                }, [] as Country[])

            svg.selectAll('path')
                .data(worldFeatures)
                .enter()
                .append('path')
                .attr('stroke', 'black')
                .attr('stroke-width', .75)
                .attr('d', path)
                .attr('fill', (data: Country) => data.legend)
                .on('mouseover', function(data: Country) {
                    const color = Color(data.legend).lighten(.35).toString()
                    tooltip.style('hidden', false).html(tooltipHtml(data))
                    D3.select(this)
                        .attr('fill', color)
                        .attr('stroke', 'white')
                        .attr('stroke-width', 2.5)
                })
                .on('mousemove', (data: Country) => {
                    tooltip.classed('hidden', false)
                        .style('top', D3.event.pageY + 'px')
                        .style('left', (D3.event.pageX + 10) + 'px')
                        .html(tooltipHtml(data))
                })
                .on('mouseout', function(data: Country) {
                    tooltip.classed('hidden', true)
                    D3.select(this)
                        .attr('fill', data.legend)
                        .attr('stroke', 'black')
                        .attr('stroke-width', .75)
                })
        })
}