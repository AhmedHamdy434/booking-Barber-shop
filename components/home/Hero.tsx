import { useTranslations } from "next-intl";
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSection,
} from "@/components/shared/motion-elements";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("HomePage");

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden bg-background"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homehero.webp"
          alt="Hero Background"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />
      </div>

      <div className="container mx-auto max-w-6xl relative text-center">
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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
            {t('description')}
          </MotionP>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="gold"
              className="px-8 h-12 rounded-full font-bold group" 
              asChild
              aria-label={t('cta')}
            >
              <Link href="/booking">
                {t('cta')}
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 rounded-full font-bold border-primary/20 hover:bg-background/80 hover:text-foreground"
              asChild
              aria-label={t('servicesTitle')}
            >
              <Link href="/about">
                {t('servicesTitle')}
              </Link>
            </Button>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
