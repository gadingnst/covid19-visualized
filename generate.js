const { readFile, writeFile } = require('fs').promises
const { feature } = require('topojson-client')
const parseCSV = require('neat-csv')

async function generateCountryData() {
    const [world, countries] = await Promise.all([
        readFile('dataset/world-110m.json', 'utf-8').then(JSON.parse),
        readFile('dataset/world-country.csv', 'utf-8').then(parseCSV)
    ])

    const data = feature(world, world.objects.countries)
        .features
        .reduce((accumulator, current) => {
            countries.some(country => current.id === country.id && (
                current.name = country.name,
                current.iso2 = country['alpha-2'],
                current.iso3 = country['alpha-3'],
                current.region = country.region,
                current.regionCode = country['region-code'],
                current.subRegion = country['sub-region'],
                current.subRegionCode = country['sub-region-code']
            )) && accumulator.push(current)

            return accumulator
        }, [])
    
    writeFile('public/world-countries-110m.json', JSON.stringify(data))
}

generateCountryData()