import { ReactNode } from 'react';

interface PropTypes<TData> {
    data: TData[]
    children: (data: TData, index: number) => ReactNode
    wrapperClass?: string
    itemClass?: string
}

export default <Data extends object>(props: PropTypes<Data>) => (
    <div className={`flex-list ${props.wrapperClass || ''}`.trimRight()}>
        {props.data.map((data, idx) => (
            <div key={idx} className={`flex-item ${props.itemClass || ''}`.trimRight()}>
                {props.children(data, idx)}
            </div>
        ))}
        <style jsx>{`
            .flex-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: stretch;
                flex-direction: row;

                .flex-item {
                    width: 47%;
                }
            }

            @media screen and (max-width: 680px) {
                .flex-list {
                    flex-direction: column;
                    
                    .flex-item {
                        width: 100%;
                    }
                }
            }
        `}</style>
    </div>
)