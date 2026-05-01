import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MotionSection, MotionDiv } from "@/components/shared/motion-elements";

export async function AboutHero() {
  const t = await getTranslations("About");

  return (
    <MotionSection 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[80vh] flex items-center py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about.webp"
          alt="About Us Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <MotionDiv
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary italic">{chunks}</span>,
            })}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
            {t("subtitle")}
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
