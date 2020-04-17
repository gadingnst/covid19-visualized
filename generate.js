const { readFile, writeFile } = require('fs').promises
const { feature } = require('topojson-client')
const parseCSV = require('neat-csv')

async function generateIndonesiaProvinces() {
    const datasets = [
        './dataset/indonesia-provinsi.json',
        './dataset/indonesia-topo-no-code.json'
    ]
    
    const [indonesiaProvinces, oldTopoData] = await Promise.all(datasets.map(path =>
        readFile(path).then(JSON.parse)
    ))

    const { provinces } = oldTopoData.objects
    const geometries = provinces.geometries.reduce((accumulator, current) => {
        const province = indonesiaProvinces.find(({ provinsi }) => provinsi === current.properties.provinsi)
        province && accumulator.push({
            ...current,
            properties: {
                ...current.properties,
                kode: province.kode
            }
        })
        return accumulator
    }, [])

    const data = {
        ...oldTopoData,
        objects: {
            provinces: { ...provinces, geometries }
        }
    }

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

generateIndonesiaProvinces()
generateCountryData()