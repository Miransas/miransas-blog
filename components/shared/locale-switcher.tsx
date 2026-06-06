'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { defaultLocale, isValidLocale, localeNames, type Locale } from '@/lib/i18n'

interface LocaleSwitcherProps {
  availableLocales: Locale[]
}

export function LocaleSwitcher({ availableLocales }: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const paramLocale = params?.locale
  const currentLocale: Locale = isValidLocale(
    typeof paramLocale === 'string' ? paramLocale : undefined,
  )
    ? (paramLocale as Locale)
    : defaultLocale

  if (availableLocales.length <= 1) return null

  const handleChange = (newLocale: Locale) => {
    let newPath = pathname
    if (currentLocale === defaultLocale) {
      newPath = `/${newLocale}${pathname}`
    } else {
      const parts = pathname.split('/')
      if (newLocale === defaultLocale) {
        parts.splice(1, 1)
      } else {
        parts[1] = newLocale
      }
      newPath = parts.join('/') || '/'
    }
    router.push(newPath)
  }

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      className="bg-transparent text-sm border border-border rounded-md px-2 py-1 hover:border-foreground/30 transition-colors"
      aria-label="Change language"
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  )
}
