import { useEffect } from 'react'
import { NextPage } from 'next'
import { Summary, Daily } from 'components'
import { Country } from 'typings/api'
import {
    useFetch,
    visualize,
    legends,
    API_BASEURL
} from 'utils'

export default (() => {
    const { data } = useFetch<Country[]>(`${API_BASEURL}/confirmed`)

    useEffect(() => {
        data && visualize('world-visualization', data)
    }, [data])

    return (
        <>
            <Summary />
            
            <h2 className="text-center mt-32 mb-12">World Visualization</h2>
            <div className="card world-visualization-container my-8">
                <div className="tooltip" />
                <div id="world-visualization" />
                <div id="legends" className="color is-theme-txt-dark px-12 my-12">
                    <h4 className="my-4 px-8">Legends</h4>
                    {legends.map(({ color, value }) => (
                        <div key={color} className="legends-item font is-size-small">
                            <div className="legends-detail">{value === 0 ? `No infected` : `${value} or more infected`}</div>
                            <div className="legends-color mx-4" style={{ backgroundColor: color }} />
                        </div>
                    ))}
                </div>
            </div>

            <Daily />
            
            <style jsx>{`
                .world-visualization-container {
                    width: 100%;
                    background-color: #0299ff;
                    border-radius: 5px;
                    overflow: hidden;
                    
                    #world-visualization {
                        width: auto;
                        overflow-y: hidden;
                        overflow-x: auto;

                        svg {
                            width: 100%;
                            height: 100%;
                            position: center;
                            background-color: #2B65EC;
                        }
                    }

                    #legends {
                        flex: 1;
                        flex-direction: column;
                        justify-content: flex-end;
                        text-align: right;

                        .legends-item {
                            display: flex;
                            flex-direction: row;
                            align-items: stretch;
                            
                            .legends-color {
                                flex: .5;
                                width: 20px;
                                height: 20px;
                                border-radius: 5px;
                                margin: 5px;
                                align-items: center;
                            }

                            .legends-detail {
                                flex: 10;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                            }
                        }
                    }
                    
                    .tooltip {
                        color: #222; 
                        background: #fff; 
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px 0px #a6a6a6;
                        padding: 2px;
                        text-shadow: #f5f5f5 0 1px 0;
                        opacity: .9;
                        position: absolute;
                        z-index: 1;
                        
                        &.hidden {
                            display: none;
                        }
                    }
                }
            `}</style>
        </>
    )
}) as NextPage
