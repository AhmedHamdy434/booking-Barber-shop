import { getTranslations } from "next-intl/server";

export async function AboutHero() {
  const t = await getTranslations("About");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-secondary/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_40%)] from-primary/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary italic">{chunks}</span>,
            })}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
