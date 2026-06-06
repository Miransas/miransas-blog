'use client'

import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

export function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = preRef.current?.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:bg-secondary hover:text-foreground"
      >
        {copied ? (
          <Check className="size-4 text-primary" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 ${className ?? ''}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
