"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav, serviceLinks } from "@/lib/data/nav";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on navigation. Adjusted during render (not an
  // effect) per React's guidance for state that should reset when a prop
  // changes: https://react.dev/learn/you-might-not-need-an-effect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,padding] duration-200",
        scrolled
          ? "border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80"
          : "border-transparent bg-paper"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-200 sm:px-6",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.04em] text-ink"
        >
          <span className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] bg-ink text-paper dark:bg-paper dark:text-ink">
            <span className="text-[0.6875rem]">S3</span>
          </span>
          SPEEDHOST360
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="focus-ring rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink hover:text-signal"
            >
              Services
            </Link>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 border border-line bg-paper-raised p-2 shadow-[var(--shadow-card)]">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring block rounded-[var(--radius-sm)] px-3 py-2.5 hover:bg-paper"
                  >
                    <span className="block text-sm font-medium text-ink">
                      {link.label}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryNav
            .filter((link) => link.label !== "Services")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "navbar" })}
            className="focus-ring flex items-center gap-1.5 text-xs text-ink-muted hover:text-signal"
          >
            <MessageCircle size={14} />
            {siteConfig.whatsappDisplay}
          </a>
          <ThemeToggle />
          <Button
            href="/contact"
            size="md"
            onClick={() => trackEvent("cta_click", { location: "navbar" })}
          >
            Start a Project
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="focus-ring flex size-9 items-center justify-center rounded-[var(--radius-sm)] border border-line"
              >
                <Menu size={18} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-paper p-6">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-mono text-sm tracking-[0.04em]">
                    MENU
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="focus-ring flex size-9 items-center justify-center rounded-[var(--radius-sm)] border border-line"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="mt-8 flex flex-1 flex-col gap-1">
                  <p className="px-1 pb-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                    Services
                  </p>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="focus-ring rounded-[var(--radius-sm)] px-1 py-2.5 text-base text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-4 h-px bg-line" />
                  {primaryNav
                    .filter((link) => link.label !== "Services")
                    .map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="focus-ring rounded-[var(--radius-sm)] px-1 py-2.5 text-base text-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                </nav>

                <div className="flex flex-col gap-3 border-t border-line pt-4">
                  <a
                    href={`tel:${siteConfig.phoneNumber}`}
                    onClick={() => trackEvent("phone_click", { location: "mobile_menu" })}
                    className="focus-ring flex items-center gap-2 text-sm text-ink"
                  >
                    <Phone size={16} /> {siteConfig.phoneDisplay}
                  </a>
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { location: "mobile_menu" })}
                    className="focus-ring flex items-center gap-2 text-sm text-ink"
                  >
                    <MessageCircle size={16} /> {siteConfig.whatsappDisplay}
                  </a>
                  <Button href="/contact" className="mt-2 w-full">
                    Start a Project
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
