import { getTranslations } from "next-intl/server";
import { Clock, Zap } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function FeaturedPackages() {
  const t = await getTranslations("Services");

  const vipPackages = [
    {
      name: "The Royal Treatment",
      price: 120,
      duration: 120,
      features: ["Classic Haircut", "Hot Towel Shave", "Face Massage", "Beard Sculpting", "Complimentary Drink"]
    },
    {
      name: "Gentleman's Essentials",
      price: 85,
      duration: 90,
      features: ["Haircut & Wash", "Classic Shave", "Scalp Treatment", "Ear & Nose Grooming"]
    }
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {t("packages.title")}
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{t("packages.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {vipPackages.map((pkg, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2.5rem] text-white hover:bg-white/15 transition-all">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{pkg.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {pkg.duration} {t("duration")}
                  </div>
                </div>
                <div className="text-4xl font-black">${pkg.price}</div>
              </div>
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3 font-medium">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="block w-full py-4 rounded-2xl bg-white text-primary font-black uppercase tracking-widest text-center hover:bg-primary-foreground transition-colors shadow-xl shadow-black/10">
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
