import { FunctionComponent } from 'react'
import './style.scss'

interface PropTypes {
    block?: boolean
    placeholder?: string
    className?: string
    onChange?: Function
}

const Search: FunctionComponent<PropTypes> = ({ block, placeholder, className, onChange }) => (
    <input
        type="text"
        placeholder={placeholder}
        className={`${block ? 'block' : ''} ${className}`.trimRight()}
        onChange={event => onChange(event.target.value)}
    />
)

Search.defaultProps = {
    block: false,
    placeholder: 'Search...',
    className: '',
    onChange: () => null
}

export default Search
