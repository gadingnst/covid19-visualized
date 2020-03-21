import { FunctionComponent } from 'react'
import './style.scss'

interface PropTypes {
    block?: boolean
    placeholder?: string
    disabled?: boolean
    className?: string
    onChange?: Function
}

const Search: FunctionComponent<PropTypes> = ({ block, disabled, placeholder, className, onChange }) => (
    <input
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        className={`${block ? 'block' : ''} ${className}`.trimRight()}
        onChange={event => onChange(event.target.value)}
    />
)

Search.defaultProps = {
    block: false,
    placeholder: 'Search...',
    disabled: false,
    className: '',
    onChange: () => null
}

export default Search
