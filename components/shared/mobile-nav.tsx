"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type NavlinkType = { href: string; label: string };

export function MobileNav({ navlinks, locale, children }: { navlinks: NavlinkType[], locale: string, children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isRtl = locale === "ar";

  // --- الحل هنا ---
  // نقوم بتخزين المسار السابق لمقارنته
  const [prevPathname, setPrevPathname] = useState(pathname);

  // إذا تغير المسار، نحدث الحالة فوراً أثناء الرندر
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }
  // ----------------

  // هذا الـ Effect سليم لأنه يتعامل مع نظام خارجي (الـ DOM) وليس مع State داخلية
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    // تنظيف (Cleanup) للتأكد من عودة التمرير عند حذف المكون
    return () => { document.documentElement.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-foreground hover:bg-primary/10"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[120] bg-background/95 backdrop-blur-xl flex flex-col h-[100dvh]"
          >
            {/* Header inside menu */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary" />
                <span className="font-black text-xl uppercase tracking-tighter">
                  Gold<span className="text-primary">Tan</span>
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-6">
              <nav className="flex flex-col gap-3">
                {navlinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-4 rounded-2xl text-xl font-bold ${
                      pathname === link.href ? "bg-primary text-primary-foreground" : "bg-muted/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}