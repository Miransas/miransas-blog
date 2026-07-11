import Image from 'next/image'
import Link from 'next/link'
import { CategoryBadge } from '@/components/shared/category-badge'
import { defaultLocale } from '@/lib/i18n'
import { formatDate, type PostMeta } from '@/lib/post-types'

export function PostCard({ post }: { post: PostMeta }) {
  const href =
    post.lang === defaultLocale
      ? `/blog/${post.slug}`
      : `/${post.lang}/blog/${post.slug}`

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={post.image || '/placeholder.svg?height=360&width=640'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <CategoryBadge label={post.category} />
        </div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-balance group-hover:text-primary">
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {post.description}
        </p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          {formatDate(post.date)}
        </p>
      </div>
    </Link>
  )
}
