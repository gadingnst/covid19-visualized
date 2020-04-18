export const API_BASEURL: string = 'https://covid19.mathdro.id/api/'
export const API_INDONESIA: string = 'https://indonesia-covid-19.mathdro.id/api/'
export const ANALYTIC_ID: string = 'UA-135036153-3'

export * from './helpers'

export { default as visualize, worldLegends, indonesiaLegends } from './visualize'
export { default as useFetch } from './useFetch'
export { default as useCounter } from './useCounter'
export { default as metaGenerator } from './metaGenerator'
