interface Meta {
    hid: string
    content: string
    name?: string
    property?: string
}

interface MetaProperty {
    title: string
    description: string
    keywords: string
}

export default (meta: MetaProperty): Meta[] => [
    { hid: 'title', name: 'title', content: meta.title },
    { hid: 'description', name: 'description', content: meta.description },
    { hid: 'keywords', name: 'keywords', content: meta.keywords }
]