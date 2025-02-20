"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 py-5">
            <Image
              src="/images/logo.webp"
              alt="Design Monks Logo"
              width={260}
              height={60}
              className="aspect-auto w-full max-w-[200px] sm:max-w-[250px]"
            />
        </Link>
        <nav className="hidden md:flex items-center justify-center space-x-6 text-lg">
          <Link href="#about" className="transition hover:text-primary">
            About
          </Link>
          <Link href="#services" className="transition hover:text-primary">
            Services
          </Link>
          <Link href="#showcase" className="transition hover:text-primary">
            Showcase
          </Link>
          <Link href="#customer-feedback" className="transition hover:text-primary">
            Customer Feedback
          </Link>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex bg-black rounded-sm p-2.5 flex-col gap-1 items-center justify-center md:hidden">
          <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
        </button>

        <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 md:hidden absolute !z-50 text-black top-full left-0 w-full bg-white`}>
          <nav className="flex flex-col gap-4 p-4 border-t border-border">
            <Link href="#about" className="transition hover:text-primary">
              About
            </Link>
            <Link href="#services" className="transition hover:text-primary">
              Services
            </Link>
            <Link href="#showcase" className="transition hover:text-primary">
              Showcase
            </Link>
            <Link href="#customer-feedback" className="transition hover:text-primary">
              Customer Feedback
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

