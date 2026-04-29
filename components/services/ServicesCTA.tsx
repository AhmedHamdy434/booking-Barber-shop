import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Star } from "lucide-react";

export async function ServicesCTA() {
  const t = await getTranslations("Services");

  return (
    <section className="py-24 border-t bg-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
            {t("cta.title")}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/booking" className="group relative px-10 py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">{t("cta.button")}</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            <Link href="/about" className="text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              Learn more about us
              <Star className="w-5 h-5 fill-primary text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
