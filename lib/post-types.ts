export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  image: string
}

export interface Post extends PostMeta {
  content: string
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
