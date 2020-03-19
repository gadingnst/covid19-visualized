import { useEffect, useState } from 'react'


interface DataCallback<TData> {
    (data: TData): TData
}
interface FetchState<TData, TError> {
    loading: boolean
    data?: TData
    error?: TError
}

export default <Data = any, Error = any>(endpoint: string, requestInit: RequestInit = {}, fnCallback: DataCallback<Data> = data => data): FetchState<Data, Error> => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Data>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
        setLoading(true)
        window.fetch(endpoint, requestInit)
            .then(response => response.json())
            .then(result => setData(fnCallback(result)))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [endpoint])

    return { data, loading, error }
}
