import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MotionSection, MotionDiv } from "@/components/shared/motion-elements";

export async function ServiceIntro() {
  const t = await getTranslations("Services");

  return (
    <MotionSection 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex items-center justify-center py-20 md:py-32 overflow-hidden bg-background min-h-[80vh]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/serviceshero.webp"
          alt="Services Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary italic">{chunks}</span>,
            })}
          </h1>
          <p className="text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("description")}
          </p>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-10"></div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
