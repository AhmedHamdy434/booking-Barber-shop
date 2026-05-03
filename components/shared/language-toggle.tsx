"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLocale} title={locale === "en" ? "العربية" : "English"}>
      <span className="sr-only">Toggle language</span>
      <span className="ml-1 text-xs font-bold uppercase">{locale === "en" ? "ar" : "en"}</span>
    </Button>
  );
}
