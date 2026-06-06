import { BlogList } from '@/components/shared/blog-list'
import { Header } from '@/components/shared/header'
import { getAllPosts, getCategories } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <header className="mb-12 flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Magic Blog
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Latest news, guides, and updates from the team. Built with Next.js
            16 and MDX.
          </p>
        </header>

        <BlogList posts={posts} categories={categories} />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} Magic Blog. Built with Next.js 16 + MDX.`}
        </div>
      </footer>
    </div>
  )
}
