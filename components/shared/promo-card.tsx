import Link from 'next/link'

export function PromoCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 overflow-hidden rounded-lg border border-border bg-secondary p-5">
        <p className="text-[10px] font-medium text-muted-foreground">
          Introducing Magic Blog Pro
        </p>
        <p className="mt-3 text-lg font-bold leading-tight text-foreground text-balance">
          UI library for Design Engineers
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          150+ free and open-source animated components built with React,
          TypeScript and Tailwind CSS.
        </p>
        <span className="mt-4 inline-block rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
          Browse Components
        </span>
      </div>
      <p className="font-semibold text-foreground">Try Magic Blog Pro</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        A design system for building beautiful and responsive web applications.
      </p>
      <Link
        href="/"
        className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4"
      >
        Learn more
      </Link>
    </div>
  )
}
