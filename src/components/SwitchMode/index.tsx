import { FunctionComponent, useState, useEffect } from 'react'
import { changeBodyTheme } from 'utils'

interface PropTypes {
    size?: number
}

const SwitchMode: FunctionComponent<PropTypes> = ({ size }) => {
    const [isDark, setDark] = useState<boolean>(false)

    const switchDark = (dark: boolean): void => {
        setDark(dark)
        changeBodyTheme(dark)
    }

    useEffect(() => {
        setDark(JSON.parse(window.localStorage.getItem('@dark-mode')) || false)
    })

    return (
        <span className="p-2" style={{ cursor: 'pointer' }} onClick={() => switchDark(!isDark)}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {
                    isDark ? (
                        <>
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </>
                    ) : (
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    )
                }
            </svg>
        </span>
    )
}

SwitchMode.defaultProps = {
    size: 24
}

export default SwitchMode
