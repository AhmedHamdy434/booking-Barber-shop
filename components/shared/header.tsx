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

export async function Header({ locale }: { locale: string }) {
  const tNav = await getTranslations("Nav");

  const navlinks = [
    { href: "/", label: tNav("home") },
    { href: "/services", label: tNav("services") },
    { href: "/about", label: tNav("about") },
    { href: "/booking", label: tNav("booking") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors ring-1 ring-primary/20">
            <Scissors className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Gold<span className="text-primary italic">Tan</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navlinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <AuthButtonsWrapper locale={locale} />
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
  return (
    <Suspense fallback={<Skeleton className="w-20 h-8 rounded-full" />}>
      <AuthButtons user={user} locale={locale} />
    </Suspense>
  );
};
