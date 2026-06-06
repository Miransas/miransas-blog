/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../provider/mode-toggle";

export function Header() {
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
          ? "bg-brand-bg/80 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-lg tracking-tight group">
           <img src="/logo.png" alt="Miransas Logo" className="h-6 w-6 group-hover:animate-pulse" />
          <span>Miransas</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Features", "Pricing", "Docs", "Changelog"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="dark:text-zinc-400 text-black hover:text-brand-primary transition-colors duration-200">
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Butonları */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="https://miransas.com"
            className="group relative inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold  text-white dark:text-zinc-950 transition-all hover:shadow-[0_0_20px_rgba(140,255,46,0.4)] active:scale-95"
          >
            <span>Miransas started</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
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
          {["Features", "Pricing", "Docs", "Changelog"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-brand-primary">
              {item}
            </Link>
          ))}
          <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
            
          </div>
        </div>
      )}
    </header>
  );
}