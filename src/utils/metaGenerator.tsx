import { ReactNode } from 'react'

interface Meta {
    hid?: string
    content?: string
    name?: string
}

interface MetaProperty {
    title: string
    description: string
    keywords: string
}

export default (meta: MetaProperty): ReactNode => {
    const metaProperties: Meta[] = [
        { hid: 'title', name: 'title', content: `${meta.title} (By: Sutan Nasution.)` },
        { hid: 'description', name: 'description', content: `${meta.description} (Made by: Sutan Nasution.)` },
        { hid: 'keywords', name: 'keywords', content: meta.keywords },
        { hid: 'theme-color', name: 'theme-color', content: '#847cf3' },
        { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#847cf3' },
        { hid: 'msapplication-TileImage', name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' }   
    ]
    
    return metaProperties.map((props, idx) => <meta key={idx} {...props} />)
}
