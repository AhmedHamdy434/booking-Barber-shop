import { Link } from "@/i18n/routing";
import { LanguageToggle } from "./language-toggle";
import { Scissors } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AuthButtons } from "./auth-buttons";
import { NavLink } from "./nav-link";
import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "./theme-toggle";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { MobileNav } from "./mobile-nav";

export async function Header({ locale }: { locale: string }) {
  const tNav = await getTranslations("Nav");

  const navlinks = [
    { href: "/", label: tNav("home") },
    { href: "/about", label: tNav("about") },
    { href: "/booking", label: tNav("booking") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <header className="sticky top-0 z-100 w-full border-b bg-background/80 backdrop-blur-xl saturate-150">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Side */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Home">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <Scissors className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:inline-block">
            Gold<span className="text-primary group-hover:text-foreground transition-colors">Tan</span>
          </span>
        </Link>

        {/* Desktop Navigation - Optimized spacing */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/40">
          {navlinks.map((link) => (
            <NavLink key={link.href} href={link.href} className="px-5 py-1.5 text-sm font-medium">
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions Side */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          
          <div className="h-6 w-px bg-border/60 mx-1 hidden md:block" />
          
          {/* تأكد أن الـ Skeleton مطابق تماماً لحجم الأزرار */}
          <Suspense fallback={<Skeleton className="w-[100px] h-9 rounded-full" />}>
            <AuthButtonsWrapper locale={locale} />
          </Suspense>

          <MobileNav navlinks={navlinks}>
             {/* تمرير الـ Toggles للموبايل */}
             <div className="flex items-center justify-between gap-4 px-4 py-2 bg-muted/50 rounded-2xl">
                <ThemeToggle />
                <LanguageToggle />
             </div>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}

const AuthButtonsWrapper = async ({ locale }: { locale: string }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AuthButtons user={user} locale={locale} />;
};
