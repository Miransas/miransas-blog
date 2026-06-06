export const locales = ['en', 'tr', 'uz'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  uz: 'O‘zbek',
}

export const localeNativeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  tr: '🇹🇷',
  uz: '🇺🇿',
}

export function isValidLocale(value: string | undefined): value is Locale {
  if (!value) return false
  return (locales as readonly string[]).includes(value)
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  return isValidLocale(first) ? first : defaultLocale
}
