import { FunctionComponent } from 'react'
import './style.scss'

interface PropTypes {
    text: string
    block?: boolean
    className?: string
    color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
    onClick?: Function
}

const Button: FunctionComponent<PropTypes> = ({ text, className, color, block, onClick }) => (
    <button
        type="button"
        className={`color is-bg-${color} ${block ? 'block' : ''} ${className}`.trimRight()}
        onClick={event => onClick(event)}
    >
        <span>{text}</span>
    </button>
)

Button.defaultProps = {
    className: '',
    color: 'default',
    block: false,
    onClick: () => null
}

export default Button
