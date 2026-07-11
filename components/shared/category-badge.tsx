import { cn } from '@/lib/utils'

/**
 * Usage example:
 * <CategoryBadge label={post.category} />
 * <CategoryBadge label="Engineering" className="text-[11px]" />
 */
const badgeStyles = [
    'border border-emerald-200 bg-emerald-50 text-emerald-700',
    'border border-sky-200 bg-sky-50 text-sky-700',
    'border border-violet-200 bg-violet-50 text-violet-700',
    'border border-amber-200 bg-amber-50 text-amber-700',
    'border border-rose-200 bg-rose-50 text-rose-700',
    'border border-cyan-200 bg-cyan-50 text-cyan-700',
    'border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700',
    'border border-indigo-200 bg-indigo-50 text-indigo-700',
]

function pickBadgeStyle(label: string) {
    const normalized = label.toLowerCase().trim()
    let hash = 0

    for (const char of normalized) {
        hash = (hash << 5) - hash + char.charCodeAt(0)
        hash |= 0
    }

    const index = Math.abs(hash) % badgeStyles.length
    return badgeStyles[index]
}

export function CategoryBadge({
    label,
    className,
}: {
    label: string
    className?: string
}) {
    const safeLabel = label?.trim() || 'General'

    return (
        <span
            className={cn(
                'w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
                pickBadgeStyle(safeLabel),
                className,
            )}
        >
            {safeLabel}
        </span>
    )
}
