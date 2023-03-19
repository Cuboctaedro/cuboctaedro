export interface Post {
    slug: string
    content: string
    data: {
        title: string
        date: Date
        description: string
    }
}
