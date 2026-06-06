import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, PostMeta } from '@/lib/post-types'

export type { Post, PostMeta } from '@/lib/post-types'
export { formatDate } from '@/lib/post-types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '',
      category: data.category ?? 'Uncategorized',
      author: data.author ?? 'Anonymous',
      image: data.image ?? '',
    } satisfies PostMeta
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '',
      category: data.category ?? 'Uncategorized',
      author: data.author ?? 'Anonymous',
      image: data.image ?? '',
      content,
    }
  } catch {
    return null
  }
}

export function getCategories(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const counts = new Map<string, number>()

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
