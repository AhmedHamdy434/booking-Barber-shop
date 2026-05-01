import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import Image from "next/image";

export async function OurStory() {
  const t = await getTranslations("About");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/about2.webp"
              alt="Our Barbershop History"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 inset-e-8">
              <p className="text-white font-bold text-4xl">Est. 2013</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
              <Star className="w-4 h-4" />
              {t("ourStory")}
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              {t("mission")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("history")}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-4xl font-black text-primary">13+</p>
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-black text-primary">25k+</p>
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
