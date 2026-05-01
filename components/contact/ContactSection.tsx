import { getTranslations } from "next-intl/server";
import { ContactForm } from "./ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: t("location"),
      value: t("address"),
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: t("phone"),
      value: "+2 01120713673",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: t("emailLabel"),
      value: "ahmedhamdy43411@gmail.com",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: t("workingHours"),
      value: t("workingHoursValue"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                {t("title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("formDesc")}
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest text-primary mb-1">
                      {info.title}
                    </h4>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 bg-card rounded-3xl border shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl" />
                
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 relative">
                    {t("formTitle")}
                </h3>
                
                <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
