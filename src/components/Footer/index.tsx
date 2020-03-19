import { FunctionComponent } from 'react'
import './style.scss'

export default(() => (
    <footer className="font is-weight-bold is-size-medium p-32">
        © {new Date().getFullYear()} <a href="https://sutanlab.id">Sutanlab</a> • <a href="https://github.com/sutanlab/covid19-visualized">Built</a> with <span id="bullshit">Bullshit</span> by <a href="https://github.com/sutanlab">Sutan Nasution.</a>
    </footer>
)) as FunctionComponent
