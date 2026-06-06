
import Link from "next/link";

export function PromoCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 overflow-hidden rounded-lg border border-border bg-secondary p-5">
        <p className="text-[10px] font-medium text-muted-foreground">
          INTRODUCING MIRANSAS
        </p>

        <p className="mt-3 text-lg font-bold leading-tight text-foreground text-balance">
          Infrastructure tools for builders.
        </p>

        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          We build self-hosted, open-source developer tools — email APIs,
          tunneling, chess engines, and more. One brand, many products.
        </p>

        <Link
          href="https://miransas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground"
        >
          See all products
        </Link>
      </div>

      <p className="font-semibold text-foreground">
        Build without limits
      </p>

      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Powerful tools, reliable infrastructure, and modern solutions
        designed for ambitious projects.
      </p>

      <Link
        href="https://miransas.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4"
      >
        Learn more
      </Link>
    </div>
  );
}

