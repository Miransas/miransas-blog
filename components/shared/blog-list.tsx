'use client'

import { useMemo, useState } from 'react'

import type { PostMeta } from '@/lib/post-types'
import { cn } from '@/lib/utils'
import { PostCard } from './post-card'

interface BlogListProps {
  posts: PostMeta[]
  categories: { name: string; count: number }[]
}

export function BlogList({ posts, categories }: BlogListProps) {
  const [active, setActive] = useState('All')

  const filters = useMemo(
    () => [{ name: 'All', count: posts.length }, ...categories],
    [posts.length, categories],
  )

  const filtered = useMemo(
    () =>
      active === 'All'
        ? posts
        : posts.filter((post) => post.category === active),
    [active, posts],
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.name}
            type="button"
            onClick={() => setActive(filter.name)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              active === filter.name
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {filter.name}
            <span
              className={cn(
                'text-xs',
                active === filter.name
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground/60',
              )}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
