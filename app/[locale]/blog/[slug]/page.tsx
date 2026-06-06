import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { Header } from '@/components/shared/header'
import { mdxComponents } from '@/components/shared/mdx-components'
import { PromoCard } from '@/components/shared/promo-card'
import { RelatedPosts } from '@/components/shared/related-posts'
import { TableOfContents } from '@/components/shared/table-of-contents'
import { defaultLocale, isValidLocale, type Locale } from '@/lib/i18n'
import {
  formatDate,
  getAllLocaleSlugs,
  getPostBySlug,
  getPostsByLocale,
} from '@/lib/posts'
import { extractToc } from '@/lib/toc'

export function generateStaticParams() {
  return getAllLocaleSlugs()
    .filter((entry) => entry.locale !== defaultLocale)
    .map(({ locale, slug }) => ({ locale, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || locale === defaultLocale) return {}
  const post = getPostBySlug(slug, locale as Locale)
  if (!post) return {}
  return {
    title: `${post.title} — Miransas Blog`,
    description: post.description,
  }
}

export default async function LocalePostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || locale === defaultLocale) notFound()

  const typedLocale = locale as Locale
  const post = getPostBySlug(slug, typedLocale)

  if (!post) {
    notFound()
  }

  const toc = extractToc(post.content)
  const related = getPostsByLocale(typedLocale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 4)

  const backHref = `/${typedLocale}`

  return (
    <div className="min-h-screen bg-background pt-12">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-12">
          <main className="min-w-0 flex-1">
            <article>
              <header className="mb-8 flex flex-col gap-4">
                <span className="w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {post.category}
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {post.title}
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </header>

              {post.image ? (
                <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypePrettyCode,
                          {
                            theme: {
                              dark: 'github-dark',
                              light: 'github-light',
                            },
                            keepBackground: false,
                          },
                        ],
                      ],
                    },
                  }}
                />
              </div>
            </article>

            <RelatedPosts posts={related} />
          </main>

          <aside className="lg:sticky lg:top-24 lg:w-72 lg:shrink-0 lg:self-start">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src="/authors/sardor.png"
                    alt={post.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Founder, Miransas
                  </p>
                </div>
              </div>

              {toc.length > 0 ? (
                <div className="rounded-xl border border-border bg-card p-5">
                  <TableOfContents items={toc} />
                </div>
              ) : null}

              <PromoCard />
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} Miransas. All rights reserved. `}
        </div>
      </footer>
    </div>
  )
}
