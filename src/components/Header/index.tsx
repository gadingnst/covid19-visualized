import { FunctionComponent } from 'react'
import Link from 'next/link'
import SwitchMode from 'components/SwitchMode'
import './style.scss'

interface PropTypes {
    title: string
    className?: string
}

export default (props => (
    <nav className={`header ${props.className || ''}`.trimRight()}>
        <div className="nav-layout">
            <h3>
                <Link href="/">                
                    <span style={{ cursor: 'pointer' }}>
                        {props.title}
                    </span>
                </Link>
            </h3>
            <SwitchMode />
        </div>
        
        <style jsx>{`
            .nav-layout {
                margin: auto;
                display: flex;
                max-width: 1080px;
                width: 100%;
                height: 100%;
                justify-content: flex-end;
                align-items: center;
                
                h3 {
                    flex: 1;
                    justify-self: flex-start;
                }
            }
        `}</style>
    </nav>
)) as FunctionComponent<PropTypes>
