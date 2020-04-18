import { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import './style.scss'

interface PropTypes {
    id: string
    legends: ReactNode
    data: any,
    visualize: (id?: string, data?: any) => Promise<void>
}

export default (({ id, legends, data, visualize }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        data && visualize(id, data).finally(() => setLoading(false))
    }, [data])

    return (
        <div className="card visualization-container my-8">
            <div className="tooltip" />
            {loading && <h2 className="color is-theme-txt-dark m-8 text-center">Loading Atlas...</h2>}
            <div id={id} className="visualization" />
            <div className="legends color is-theme-txt-dark px-12 my-12">
                <h4 className="my-4 px-8">Legends</h4>
                {legends}
            </div>
        </div>
    )
}) as FunctionComponent<PropTypes>
