type SummaryObjectType = {
    value: number
    detail: string
}

type DailyStats = {
    total: number
    china: number
    outsideChina: number
    perDay?: number
}

export interface IDFormat<TData = any> {
    data: TData
    warning?: string
}

export interface IDSummary {
    meninggal: number
    sembuh: number
    perawatan: number
    jumlahKasus: number
}

export interface IDDaily {
    harike: number
    tanggal: number
    jumlahKasusBaruperHari: number | null
    jumlahKasusSembuhperHari: number | null
    jumlahKasusMeninggalperHari: number | null
    jumlahKasusKumulatif: number | null
    jumlahpasiendalamperawatan: number | null
    persentasePasiendalamPerawatan: number | null
    jumlahPasienSembuh: number | null
    persentasePasienSembuh: number | null
    jumlahPasienMeninggal: number | null
    persentasePasienMeninggal: number | null
    fid: number
}

export interface IDProvince {
    kodeProvi: number
    provinsi: string
    kasusPosi: number
    kasusSemb: number
    kasusMeni: number
    pembaruan: string
    fid: number
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
    totalConfirmed: number
    mainlandChina: number
    otherLocations: number
    deltaConfirmed: number
    totalRecovered: number
    confirmed: DailyStats
    deltaConfirmedDetail: DailyStats
    deaths: DailyStats
    recovered: DailyStats
    active: number
    deltaRecovered: number
    incidentRate: number
    peopleTested: number
    reportDate: string
}

export interface Summary {
    confirmed: SummaryObjectType
    recovered: SummaryObjectType
    deaths: SummaryObjectType
    lastUpdate: string
}