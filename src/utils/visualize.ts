import { select, event, geoPath, geoNaturalEarth1, geoEquirectangular } from 'd3'
import { getPercentage, getActiveCase, getActiveCaseID } from 'utils'
import { Country, IDProvince } from 'typings/api'

interface Legend {
    color: string
    value: number
}

export const worldLegends: Legend[] = [
    { color: '#730707', value: 10001 },
    { color: '#B90A0A', value: 5001 },
    { color: '#FF0000', value: 501 },
    { color: '#F16F16', value: 51 },
    { color: '#F1C316', value: 26 },
    { color: '#FDF211', value: 1 },
    { color: '#3AFF00', value: 0 }
]

export const indonesiaLegends: Legend[] = [
    { color: '#730707', value: 5001 },
    { color: '#B90A0A', value: 1501 },
    { color: '#FF0000', value: 501 },
    { color: '#F16F16', value: 201 },
    { color: '#F1C316', value: 51 },
    { color: '#FDF211', value: 1 },
    { color: '#3AFF00', value: 0 }
]

export const indonesia = async (id: string, data: IDProvince[]): Promise<void> => {
    const tooltipHtml = (data: IDProvince): string => {
        return `
            <div id="covid19-tooltip">
                <h3 class="text-center my-2">${data.provinsi}</h3>
                <h5>Positif: ${data.kasusPosi}</h5>
                <h5>Aktif: ${getActiveCaseID(data)} (${getPercentage(getActiveCaseID(data), data.kasusPosi)})</h5>
                <h5>Sembuh: ${data.kasusSemb} (${getPercentage(data.kasusSemb, data.kasusPosi)})</h5>
                <h5>Meninggal: ${data.kasusMeni} (${getPercentage(data.kasusMeni, data.kasusPosi)})</h5>
            </div>
        `
    }

    const tooltip = select('.tooltip')
    
    const svg = select(`#${id}`)
        .append('svg')
        .attr('width', 960)
        .attr('height', 350)

    const path = geoPath().projection(
        geoEquirectangular()
            .scale(1050)
            .rotate([-120, 0])
            .translate([1050 / 2, 300 / 2])
    )

    const provinces = (await window.fetch('/indonesia-provinces.json')
        .then(response => response.json()) as IDProvince[])
        .map(province => {
            const covid19Data = data.find(({ kodeProvi }) => kodeProvi === province.kodeProvi)
            return {
                ...province,
                ...covid19Data,
                legend: indonesiaLegends.find(({ value }) => !!covid19Data.kasusPosi
                    ? covid19Data.kasusPosi > (value - 1)
                    : value === 0
                ).color
            }
        }) as any[]
    
        svg.selectAll('path')
            .data(provinces)
            .enter()
            .append('path')
            .attr('stroke', 'black')
            .attr('stroke-width', .75)
            .attr('d', path)
            .attr('fill', (data: IDProvince) => data.legend)
            .on('mouseover', function(data: IDProvince) {
                tooltip.style('hidden', false).html(tooltipHtml(data))
                select(this)
                    .attr('fill', '#ddd')
                    .attr('stroke', 'white')
                    .attr('stroke-width', 2.5)
            })
            .on('mousemove', (data: IDProvince) => {
                tooltip.classed('hidden', false)
                    .style('top', event.pageY + 'px')
                    .style('left', (event.pageX + 10) + 'px')
                    .html(tooltipHtml(data))
            })
            .on('mouseout', function(data: IDProvince) {
                tooltip.classed('hidden', true)
                select(this)
                    .attr('fill', data.legend)
                    .attr('stroke', 'black')
                    .attr('stroke-width', .75)
            })
            
}

export const world = async (id: string, data: Country[]): Promise<void> => {
    const tooltipHtml = (data: Country): string => `
        <div id="covid19-tooltip">
            <h3 class="text-center my-2">${data.name}</h3>
            <h5>Confirmed: ${data.confirmed}</h5>
            <h5>Active: ${getActiveCase(data)} (${getPercentage(getActiveCase(data), data.confirmed)})</h5>
            <h5>Recovered: ${data.recovered} (${getPercentage(data.recovered, data.confirmed)})</h5>
            <h5>Deaths: ${data.deaths} (${getPercentage(data.deaths, data.confirmed)})</h5>
        </div>
    `

    const mergeSummary = (country: Country) => (
        (acc: Country, cur: Country): Country => {
            country.iso3 === cur.iso3 && (
                acc.countryRegion = cur.countryRegion,
                acc.confirmed += cur.confirmed,
                acc.recovered += cur.recovered,
                acc.deaths += cur.deaths
            )
            return acc
        }
    )

    const tooltip = select('.tooltip')
    
    const svg = select(`#${id}`)
        .append('svg')
        .attr('width', 960)
        .attr('height', 520)
    
    const path = geoPath().projection(
        (geoNaturalEarth1() 
            .rotate([-9, 0]) as any)
            .scale([1300 / (2 * Math.PI)])
            .translate([450, 300])
    )

    const worlds = (await window.fetch('/world-countries-110m.json')
        .then(response => response.json()) as Country[])
        .map(country => {
            const covid19Data = data.reduce(mergeSummary(country), {
                countryRegion: '',
                confirmed: 0,
                recovered: 0,
                deaths: 0
            } as Country)

            return {
                ...country,
                confirmed: covid19Data.confirmed,
                recovered: covid19Data.recovered,
                deaths: covid19Data.deaths,
                name: covid19Data.countryRegion || country.name,
                legend: worldLegends.find(({ value }) => !!covid19Data.countryRegion
                    ? covid19Data.confirmed > (value - 1)
                    : value === 0
                ).color
            }
        }) as any[]
    
    svg.selectAll('path')
        .data(worlds)
        .enter()
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', .75)
        .attr('d', path)
        .attr('fill', (data: Country) => data.legend)
        .on('mouseover', function(data: Country) {
            tooltip.style('hidden', false).html(tooltipHtml(data))
            select(this)
                .attr('fill', '#ddd')
                .attr('stroke', 'white')
                .attr('stroke-width', 2.5)
        })
        .on('mousemove', (data: Country) => {
            tooltip.classed('hidden', false)
                .style('top', event.pageY + 'px')
                .style('left', (event.pageX + 10) + 'px')
                .html(tooltipHtml(data))
        })
        .on('mouseout', function(data: Country) {
            tooltip.classed('hidden', true)
            select(this)
                .attr('fill', data.legend)
                .attr('stroke', 'black')
                .attr('stroke-width', .75)
        })
}

export default { world, indonesia }