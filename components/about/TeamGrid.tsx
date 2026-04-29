import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function TeamGrid() {
  const t = await getTranslations("About");

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
          {t("team.title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t("team.subtitle")}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="group relative overflow-hidden rounded-3xl bg-secondary/10">
              <div className="aspect-[4/5] relative">
                <Image
                  src={`https://images.unsplash.com/photo-1503467913725-8484b65b0715?q=80&w=1000&auto=format&fit=crop`}
                  alt="Barber profile"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Marco Rossi</p>
                  <p className="text-primary font-medium text-sm uppercase tracking-widest">Master Barber</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
