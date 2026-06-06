'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/toc'

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0% 0% -75% 0%', threshold: 1 },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 font-semibold text-foreground">On this page</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? '0.75rem' : 0 }}
          >
            <a
              href={`#${item.id}`}
              className={
                activeId === item.id
                  ? 'font-medium text-foreground underline underline-offset-4'
                  : 'text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
