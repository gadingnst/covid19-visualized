type SummaryObjectType = {
    value: number
    detail: string
}

export interface Country {
    provinceState: string | null
    countryRegion: string | null
    lastUpdate: number | null
    lat: number | null
    long: number | null
    confirmed: number | null
    deaths: number | null
    recovered: number | null
    iso2?: string
    iso3?: string
    legend?: string
    [name: string]: any
}

export interface Daily {
    reportDate: number | null
    mainlandChina: number | null
    otherLocations: number | null
    totalConfirmed: number | null
    totalRecovered: number | null
    reportDateString: string | null
    deltaConfirmed: number  | null
    deltaRecovered: number | null
    objectid: number
    confirmed?: number
    recovered?: number
}

export interface Summary {
    confirmed: SummaryObjectType
    recovered: SummaryObjectType
    deaths: SummaryObjectType
    lastUpdate: string
}
