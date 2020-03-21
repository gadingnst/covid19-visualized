import { useEffect, useState } from 'react'
import { onScrollBottom } from 'utils'

interface ScrollCounter {
    counter: number
    reset: (num?: number) => void
    increase: () => void
    eventScroll: () => void
}

export default <Data extends object[]>(data: Data, increment: number): ScrollCounter => {
    const [counter, setCounter] = useState<number>(0)

    const increase = (): void => {
        setCounter(counter => counter > data.length
            ? data.length
            : counter + increment
        )
    }
    
    const reset = (num: number = increment): void => setCounter(num)
    const onScroll = onScrollBottom(increase)

    useEffect(() => {
        data && setCounter(increment)
    }, [data])

    return { counter, reset, increase, eventScroll: onScroll }
}
