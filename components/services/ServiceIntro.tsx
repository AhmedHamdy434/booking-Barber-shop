import { getTranslations } from "next-intl/server";

export async function ServiceIntro() {
  const t = await getTranslations("Services");

  return (
    <section className="py-20 md:py-28 bg-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
          {t.rich("title", {
            span: (chunks) => <span className="text-primary italic">{chunks}</span>,
          })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-10"></div>
      </div>
    </section>
  );
}
