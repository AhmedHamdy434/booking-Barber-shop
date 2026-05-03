import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MotionDiv, MotionH1, MotionP } from "../shared/motion-elements";

export async function ContactHero() {
  const t = await getTranslations("Contact");

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contact-hero.png"
          alt="Contact Hero Background"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </div>

      <div className="container mx-auto max-w-6xl relative text-center z-10 px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 backdrop-blur-md rounded-full border border-primary/20">
            {t("title")}
          </span>
          <MotionH1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white">
            {t.rich('heroTitle', {
              span: (chunks) => <span className="text-primary italic">{chunks}</span>
            })}
          </MotionH1>
          <MotionP className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('heroDesc')}
          </MotionP>
        </MotionDiv>
      </div>
    </section>
  );
}
