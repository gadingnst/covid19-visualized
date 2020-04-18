import { FunctionComponent, useEffect } from 'react'
import { Header, Footer } from 'components'
import { changeBodyTheme } from 'utils'

export default(({ children }) => {
    useEffect(() => {
        changeBodyTheme(JSON.parse(window.localStorage.getItem('@dark-mode')) || false)
    }, [])

    return (
        <>
            <Header
                title="COVID-19 Visualized"
                className="color is-bg-primary is-theme-txt-dark px-24 py-12"
            />
            {children}
            <Footer />
        </>
    )
}) as FunctionComponent