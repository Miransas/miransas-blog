import GithubSlugger from 'github-slugger'

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger()
  const lines = content.split('\n')
  const items: TocItem[] = []
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim())
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/[*_`]/g, '').trim()
      items.push({ id: slugger.slug(text), text, level })
    }
  }

  return items
}
