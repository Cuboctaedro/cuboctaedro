export interface Project {
    slug: string
    content: string
    data: {
        title: string
        link?: string
        gallery: Array<string>
        featuredimage: string
        tags: Array<'desing' | 'development'>
        description: string
        order: number
    }
}
