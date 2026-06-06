import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { defaultLocale, isValidLocale, locales, type Locale } from '@/lib/i18n'
import type { Post, PostMeta } from '@/lib/post-types'

export type { Post, PostMeta } from '@/lib/post-types'
export { formatDate } from '@/lib/post-types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

interface RawPost {
  baseSlug: string
  lang: Locale
  data: Record<string, unknown>
  content: string
}

function readRawPosts(): RawPost[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))

  return files.map((file) => {
    const fullPath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const withoutExt = file.replace(/\.mdx$/, '')
    const parts = withoutExt.split('.')

    let baseSlug = withoutExt
    let lang: Locale = defaultLocale

    if (parts.length > 1 && isValidLocale(parts[parts.length - 1])) {
      lang = parts[parts.length - 1] as Locale
      baseSlug = parts.slice(0, -1).join('.')
    } else if (typeof data.lang === 'string' && isValidLocale(data.lang)) {
      lang = data.lang
    }

    if (typeof data.slug === 'string' && data.slug.length > 0) {
      baseSlug = data.slug
    }

    return { baseSlug, lang, data, content }
  })
}

function toMeta(raw: RawPost, translations: Partial<Record<Locale, true>>): PostMeta {
  const { baseSlug, lang, data } = raw
  return {
    slug: baseSlug,
    title: (data.title as string) ?? baseSlug,
    description: (data.description as string) ?? '',
    date: (data.date as string) ?? '',
    category: (data.category as string) ?? 'Uncategorized',
    author: (data.author as string) ?? 'Anonymous',
    image: (data.image as string) ?? '',
    lang,
    translations,
  }
}

function buildTranslationMap(raws: RawPost[]): Map<string, Partial<Record<Locale, true>>> {
  const map = new Map<string, Partial<Record<Locale, true>>>()
  for (const raw of raws) {
    const entry = map.get(raw.baseSlug) ?? {}
    entry[raw.lang] = true
    map.set(raw.baseSlug, entry)
  }
  return map
}

export function getPostsByLocale(locale: Locale = defaultLocale): PostMeta[] {
  const raws = readRawPosts()
  const translationMap = buildTranslationMap(raws)

  const posts = raws
    .filter((raw) => raw.lang === locale)
    .map((raw) => toMeta(raw, translationMap.get(raw.baseSlug) ?? {}))

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllPosts(): PostMeta[] {
  return getPostsByLocale(defaultLocale)
}

export function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Post | null {
  const raws = readRawPosts()
  const translationMap = buildTranslationMap(raws)

  const raw = raws.find((r) => r.baseSlug === slug && r.lang === locale)
  if (!raw) return null

  const meta = toMeta(raw, translationMap.get(raw.baseSlug) ?? {})
  return { ...meta, content: raw.content }
}

export function getPostTranslations(slug: string): Locale[] {
  const raws = readRawPosts()
  return raws.filter((r) => r.baseSlug === slug).map((r) => r.lang)
}

export function getCategoriesByLocale(
  locale: Locale = defaultLocale,
): { name: string; count: number }[] {
  const posts = getPostsByLocale(locale)
  const counts = new Map<string, number>()

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCategories(): { name: string; count: number }[] {
  return getCategoriesByLocale(defaultLocale)
}

export function getAllLocaleSlugs(): { locale: Locale; slug: string }[] {
  const raws = readRawPosts()
  return raws
    .filter((r) => locales.includes(r.lang))
    .map((r) => ({ locale: r.lang, slug: r.baseSlug }))
}
