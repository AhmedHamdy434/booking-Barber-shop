import { useTranslations } from 'next-intl';
import { MotionDiv, MotionH2 } from '@/components/shared/motion-elements';
import { Scissors, Calendar, ShieldCheck } from 'lucide-react';

export function Features() {
  const t = useTranslations('HomePage');

  const features = [
    {
      icon: <Scissors className="w-8 h-8 text-primary" />,
      title: t('features.barbers.title'),
      description: t('features.barbers.description'),
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: t('features.booking.title'),
      description: t('features.booking.description'),
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: t('features.safety.title'),
      description: t('features.safety.description'),
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <MotionH2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {t('featuresTitle')}
        </MotionH2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <MotionDiv 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-background border border-border/50 shadow-sm"
    >
      <div className="mb-6 inline-flex p-3 rounded-xl bg-primary/5 ring-1 ring-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </MotionDiv>
  );
}
