const { readFile, writeFile } = require('fs').promises
const { feature } = require('topojson-client')
const parseCSV = require('neat-csv')

async function generateIndonesiaProvinces() {
    const datasets = [
        './dataset/indonesia-provinsi.json',
        './dataset/indonesia-topo-no-code.json'
    ]
    
    const [indonesiaProvinces, oldTopoData] = await Promise.all(datasets.map(path => (
        readFile(path).then(JSON.parse)
    )))

    const data = feature(oldTopoData, oldTopoData.objects.provinces)
        .features
        .reduce((accumulator, current) => {
            const province = indonesiaProvinces.find(({ provinsi }) => provinsi === current.properties.provinsi)
            
            if (province) {
                const properties = { ...current.properties }
                delete current.properties
                accumulator.push({
                    ...current,
                    ...properties,
                    kodeProvi: province.kode
                })
            }
            
            return accumulator
        }, [])

    writeFile('public/indonesia-provinces.json', JSON.stringify(data))
}

async function generateCountryData() {
    const [world, countries] = await Promise.all([
        readFile('dataset/world-110m.json', 'utf-8').then(JSON.parse),
        readFile('dataset/world-country.csv', 'utf-8').then(parseCSV)
    ])

    const data = feature(world, world.objects.countries)
        .features
        .reduce((accumulator, current) => {
            const assignedCountry = countries.some(country => current.id === country.id && (
                current.name = country.name,
                current.iso2 = country['alpha-2'],
                current.iso3 = country['alpha-3'],
                current.region = country.region,
                current.regionCode = country['region-code'],
                current.subRegion = country['sub-region'],
                current.subRegionCode = country['sub-region-code']
            ))
            
            if (assignedCountry) {
                delete current.properties
                accumulator.push(current)
            }

            return accumulator
        }, [])

    writeFile('public/world-countries-110m.json', JSON.stringify(data))
}

generateIndonesiaProvinces()
generateCountryData()