import React from 'react'
import GithubSlugger from 'github-slugger'
import { MDXComponents } from 'mdx/types'
import { CodeBlock } from './code-block'


function slugify(node: React.ReactNode): string {
  const slugger = new GithubSlugger()
  const text = typeof node === 'string' ? node : String(node ?? '')
  return slugger.slug(text)
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }: { children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={slugify(children)}
      className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={slugify(children)}
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props) => (
    <p className="leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-4 italic text-foreground"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
}
