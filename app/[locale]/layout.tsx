import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/providers";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import "../globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: t("template"),
      default: t("title"),
    },
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={` ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-cairo"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header locale={locale} />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
