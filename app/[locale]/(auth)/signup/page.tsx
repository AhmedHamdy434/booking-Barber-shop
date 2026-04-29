import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignupForm } from "@/components/auth/signup-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('signup') };
}

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <SignupForm locale={locale} />
    </div>
  );
}
