import { ReactNode, useState, useEffect } from 'react'
import { useCounter  } from 'utils'
import { FlexList } from 'components'

interface PropTypes<TData> {
    loading: boolean
    data: TData[]
    children: (data: TData) => ReactNode
}

export default <Data extends object>({ data, loading, children }: PropTypes<Data>) => {
    const [daily, setDaily] = useState<Data[]>([])
    const { counter, eventScroll } = useCounter(data, 6)

    useEffect(() => {
        data && window.addEventListener('scroll', eventScroll)
        return () => {
            window.removeEventListener('scroll', eventScroll)
        }
    }, [data])

    useEffect(() => {
        counter > 0 && setDaily(data.slice(0, counter))
    }, [counter])

    return (
        <div className="my-32">
            <h2 className="text-center my-12">{loading ? 'Loading Daily Update...' : 'Daily Update'  }</h2>
            <FlexList<Data> data={daily} itemClass="my-12">
                {daily => children(daily)}
            </FlexList>
        </div>
    )
}
