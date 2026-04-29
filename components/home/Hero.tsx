import { useTranslations } from 'next-intl';
import { MotionDiv, MotionH1, MotionP, MotionSection } from '@/components/shared/motion-elements';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('HomePage');

  return (
    <MotionSection 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-20 px-4 md:py-32 overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
            {t('title')}
          </span>
          <MotionH1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            {t.rich('heroTitle', {
              span: (chunks) => <span className="text-primary italic">{chunks}</span>
            })}
          </MotionH1>
          <MotionP className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
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
              className="px-8 h-12 rounded-full font-bold border-primary/20 hover:bg-primary/5"
              aria-label={t('servicesTitle')}
            >
              {t('servicesTitle')}
            </Button>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
