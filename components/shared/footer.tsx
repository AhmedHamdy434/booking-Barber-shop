import { useTranslations } from "next-intl";
import { Scissors } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Barber<span className="text-primary">Pro</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            {t('rights', { year: 2026 })}
          </p>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">{t("privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("terms")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
