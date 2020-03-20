type SummaryObjectType = {
    value: number
    detail: string
}

export interface IDCases {
    no: number
    usia: number | null
    jk: string | null
    wn: string | null
    provinsi: string | null
    kota: string | null
    jeniskasus: string | null
    kluster: string | null
    sumberKontak: string | null
    kontakdgnpasienCOVID19: Date | null
    mulaiGejala: Date | null
    mulaiDiisolasi: Date | null
    positif: Date | null
    dirawatdi: string | null
    kondisiKesehatan: string | null
    keterangan: string | null
    referensi: string | null
    lamaInkubasi: number | null
    status: string | null
    fid: number | null
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
