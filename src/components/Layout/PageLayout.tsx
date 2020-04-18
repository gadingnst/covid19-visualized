import { useEffect } from 'react'
import { NextPage } from 'next'
import ReactGA from 'react-ga'
import { ANALYTIC_ID } from 'utils'

export default (PageComponent: NextPage) => () => {
    useEffect(() => {
        ReactGA.initialize(ANALYTIC_ID)
        ReactGA.pageview(window.location.pathname)
    }, [])

    return <PageComponent />
}
