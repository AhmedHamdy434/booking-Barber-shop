import { getTranslations } from "next-intl/server";
import { Shield, Sparkles, Users } from "lucide-react";

export async function CoreValues() {
  const t = await getTranslations("About");

  return (
    <section className="py-24 bg-secondary/5 border-y">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
          {t("values.title")}
        </h2>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-10 rounded-3xl border shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("values.quality")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("values.qualityDesc")}</p>
          </div>
          <div className="bg-background p-10 rounded-3xl border shadow-sm hover:shadow-xl transition-all group border-primary/20 bg-secondary/5">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("values.hygiene")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("values.hygieneDesc")}</p>
          </div>
          <div className="bg-background p-10 rounded-3xl border shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("values.experience")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("values.experienceDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
