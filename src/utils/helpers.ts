import { DataType as Summary } from 'components/Chart'
import { IDProvince } from 'typings/api'

type PerDayParams<TData> = {
    data: TData[]
    stats: string
    index: number
}

export const getPerDayStats = <T extends object>({ data, stats, index }: PerDayParams<T>): number => index === 0
    ? data[index][stats].total
    : data[index][stats].total - data[index - 1][stats].total

export const getPercentage = (amount: number, total: number): string => (
    ((amount * 100) / (total || 1)).toFixed(2) + '%'
)

export const getActiveCase = (data: Summary): number => (
    data.confirmed - (data.recovered + data.deaths)
)

export const getActiveCaseID = (data: IDProvince) => getActiveCase({
    confirmed: data.kasusPosi,
    recovered: data.kasusSemb,
    deaths: data.kasusMeni
})

export const changeBodyTheme = (dark: boolean): void => {
    document.body.setAttribute('class', dark ? 'dark' : 'light')
    window.localStorage.setItem('@dark-mode', String(dark))
}

export const dateFormat = (dateTz: string | number, withTime: boolean = false, locales: string = 'en-ID'): string => {
    let options: any = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    } 
    
    if (withTime) {
        options = {
            ...options,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    }

    return new Date(dateTz).toLocaleString(locales, options)
}

export const onScrollBottom = (callback: () => void) => (): void => {
    const scrollHeight = window.innerHeight + window.scrollY
    const footerHeight = document.querySelector('footer').scrollHeight
    const pageHeight = document.body.scrollHeight - footerHeight
    
    if (pageHeight < scrollHeight) callback()
}