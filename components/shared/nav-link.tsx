"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-bold transition-colors uppercase tracking-widest hover:text-primary",
        isActive ? "text-primary" : "text-foreground/70",
        className
      )}
    >
      {children}
    </Link>
  );
}
