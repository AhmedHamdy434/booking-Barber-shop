"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsPending(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-primary/5 rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{t("success")}</h3>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          {t("title")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
            {t("name")}
          </label>
          <Input 
            required 
            placeholder={t("namePlaceholder")}
            className="h-12 border-2 focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
            {t("email")}
          </label>
          <Input 
            required 
            type="email"
            placeholder={t("emailPlaceholder")}
            className="h-12 border-2 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {t("subject")}
        </label>
        <Input 
          required 
          placeholder={t("subjectPlaceholder")}
          className="h-12 border-2 focus-visible:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {t("message")}
        </label>
        <textarea
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full h-12 font-bold text-lg"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        {t("submit")}
      </Button>
    </form>
  );
}
