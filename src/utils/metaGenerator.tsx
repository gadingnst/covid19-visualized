import { ReactNode } from 'react'

interface Meta {
    hid?: string
    content?: string
    name?: string
    property?: string
    rel?: string
    type?: string
    href?: string
    sizes?: string
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
        { name: 'theme-color', content: '#11CDEF' },
        { name: 'msapplication-TileColor', content: '#11CDEF' },
        { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' }
    ]

    return metaProperties.map((props, idx) => <meta key={idx} {...props} />)
}
