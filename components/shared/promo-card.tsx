
import Link from "next/link";

export function PromoCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 overflow-hidden rounded-lg border border-border bg-secondary p-5">
        <p className="text-[10px] font-medium text-muted-foreground">
          Introducing Miransas
        </p>

        <p className="mt-3 text-lg font-bold leading-tight text-foreground text-balance">
          Engineering the next generation of digital products.
        </p>

        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          A modern technology platform focused on performance, scalability,
          and developer experience. Build faster and grow with confidence.
        </p>

        <span className="mt-4 inline-block rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
          Explore Platform
        </span>
      </div>

      <p className="font-semibold text-foreground">
        Build without limits
      </p>

      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Powerful tools, reliable infrastructure, and modern solutions
        designed for ambitious projects.
      </p>

      <Link
        href="/"
        className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4"
      >
        Learn more
      </Link>
    </div>
  );
}

