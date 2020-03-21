import { useEffect, useState, ReactNode } from 'react'
import { Search, Button } from 'components'
import { useCounter } from 'utils'

interface PropTypes<TData> {
    data: TData[]
    loading: boolean
    searchPlaceholder: string
    searchFilter: (keyword: string, item: TData, idx: number) => boolean
    children: (data: TData[], keyword: string) => ReactNode
}

export default <Data extends object>(props: PropTypes<Data>) => {
    const [keyword, setKeyword] = useState<string>('')
    const [data, setData] = useState<Data[]>([])
    const [filteredData, setFilteredData] = useState<Data[]>([])
    const dataCount = useCounter(props.data, 6)
    const filterCount = useCounter(filteredData, 6)

    const onSearch = (value: string): void => {
        setKeyword(value.toLowerCase())
    }

    const onShowMore = () => filteredData.length
        ? filterCount.increase()
        : dataCount.increase()

    const renderShowMore = () => {
        if (props.data) {
            const maxFilterData = filteredData.length && data.length === filteredData.length
            const maxData = data.length === props.data.length
            const match = data.length + filteredData.length > 0

            if (!(maxFilterData || maxData) && match) {
                return (
                    <Button
                        block
                        text="Show more..."
                        color="primary"
                        onClick={onShowMore}
                    />
                )
            }
        }
    }

    useEffect(() => {
        dataCount.counter > 0
            && setData(props.data.slice(0, dataCount.counter))
    }, [dataCount.counter])

    useEffect(() => {
        filterCount.counter > 0
            && setData(filteredData.slice(0, filterCount.counter))
    }, [filterCount.counter])

    useEffect(() => {
        if (keyword.length) {
            dataCount.counter > 6 && dataCount.reset(6)
            setData(filteredData.slice(0, filterCount.counter))
        } else {
            props.data && setData(
                props.data.slice(0, dataCount.counter)
            )
        }
    }, [filteredData])

    useEffect(() => {
        if (keyword.length) {
            setFilteredData(props.data
                .filter((item, idx) => props.searchFilter(
                    keyword.toLowerCase(), item, idx
                ))
            )
        } else {
            setFilteredData([])
        }
    }, [keyword])

    return (
        <>
            <Search
                block
                className="p-12"
                disabled={props.loading}
                onChange={onSearch}
                placeholder={props.loading
                    ? 'Loading...'
                    : props.searchPlaceholder
                }
            />

            {props.loading && <h2 className="text-center my-8">Loading...</h2>}

            {props.children(data, keyword)}

            {renderShowMore()}
        </>
    )
}
