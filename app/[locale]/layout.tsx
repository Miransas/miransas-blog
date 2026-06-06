import { notFound } from 'next/navigation'
import { defaultLocale, isValidLocale, locales } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.filter((l) => l !== defaultLocale).map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale === defaultLocale) notFound()
  return <>{children}</>
}
