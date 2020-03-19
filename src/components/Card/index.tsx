import { FunctionComponent, ReactNode } from 'react'
import './style.scss'

interface PropTypes {
    children: ReactNode
    className?: string
    header?: ReactNode
    footer?: ReactNode
}

export default (props => (
    <div className={`card p-8 ${props.className || ''}`.trimRight()}>
        {props.header && (
            <div className="card-header">
                {props.header}
            </div>
        )}
        <div className="card-body">
            {props.children}
        </div>
        {props.footer && (
            <div className="card-footer">
                {props.footer}
            </div>
        )}
    </div>
)) as FunctionComponent<PropTypes>
