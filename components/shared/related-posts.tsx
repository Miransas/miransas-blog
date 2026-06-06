import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { defaultLocale } from '@/lib/i18n'
import { formatDate, type PostMeta } from '@/lib/post-types'

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Read more
        </h2>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          All posts
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={
              post.lang === defaultLocale
                ? `/blog/${post.slug}`
                : `/${post.lang}/blog/${post.slug}`
            }
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <span className="w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {post.category}
              </span>
              <h3 className="font-semibold leading-snug text-foreground text-balance group-hover:text-primary">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <time
                dateTime={post.date}
                className="mt-auto pt-2 text-xs text-muted-foreground"
              >
                {formatDate(post.date)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
