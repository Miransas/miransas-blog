/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "../provider/mode-toggle";
import { LocaleSwitcher } from "./locale-switcher";

const navLinks = [
  { label: "CourierX", href: "https://courierx.io" },
  { label: "Binboi", href: "https://binboi.com" },
  { label: "Miransas-Chess", href: "https://miransas.com/projects/miransas-chess" },
];

interface HeaderProps {
  availableLocales?: Locale[];
}

export function Header({ availableLocales = [defaultLocale] }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 w-full transition-all duration-300 ease-in-out font-sans border-b",
        isScrolled
          ? "dark:bg-brand-bg/80 backdrop-blur-md border-white/10 dark:border-white/20 bg-white/80"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-lg tracking-tight group">
           <img src="/logo.png" alt="Miransas Logo" className="h-6 w-6 group-hover:animate-pulse" />
          <span className="text-lg font-bold dark:text-white text-black">Miransas</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 dark:text-zinc-400 text-black hover:text-brand-primary transition-colors duration-200"
            >
              {item.label}
              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
            </Link>
          ))}
        </nav>

        {/* CTA Butonları */}
        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher availableLocales={availableLocales} />
          <ThemeToggle />
          <Link
            href="https://miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Miransas — see all our products"
            className="group relative inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold  text-white dark:text-zinc-950 transition-all hover:shadow-[0_0_20px_rgba(140,255,46,0.4)] active:scale-95"
          >
            <span>Miransas</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={3} />
          </Link>
        </div>

        {/* Mobil Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden text-white hover:text-brand-primary transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobil Menü */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-brand-bg/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 text-lg font-medium text-white hover:text-brand-primary"
            >
              {item.label}
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
          <div className="border-t border-white/5 pt-6 flex flex-col gap-4">

          </div>
        </div>
      )}
    </header>
  );
}