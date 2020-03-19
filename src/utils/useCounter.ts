import { useEffect, useState } from 'react'

export default (<Data extends object[]>(data: Data, increment: number): number => {
    const [counter, setCounter] = useState<number>(0)

    const onScroll = (): void => {
        const scrollHeight = window.innerHeight + window.scrollY
        const footerHeight = document.querySelector('footer').scrollHeight
        const pageHeight = document.body.scrollHeight - footerHeight

        if (pageHeight < scrollHeight) {
            setCounter(counter => counter > data.length
                ? data.length
                : counter + increment
            )
        }
    }

    useEffect(() => {
        if (!!data) {
            setCounter(increment)
            window.addEventListener('scroll', onScroll)
        }

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [data])

    return counter
})