import type { Locale } from './i18n'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  image: string
  lang: Locale
  translations: Partial<Record<Locale, true>>
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
