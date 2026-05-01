"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { FormInput } from "../shared/form-input";
import { FormTextarea } from "../shared/form-textarea";
import { toast } from "sonner";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsPending(false);
    toast.success(t("success"), {
      description: t("successDesc"),
    });

    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          id="name"
          name="name"
          label={t("name")}
          placeholder={t("namePlaceholder")}
          required
          disabled={isPending}
          className="h-12 border-2 text-start"
        />
        <FormInput 
          id="email"
          name="email"
          type="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          required
          disabled={isPending}
          className="h-12 border-2"
        />
      </div>

      <FormInput 
        id="subject"
        name="subject"
        label={t("subject")}
        placeholder={t("subjectPlaceholder")}
        required
        disabled={isPending}
        className="h-12 border-2 text-start"
      />

      <FormTextarea 
        id="message"
        name="message"
        label={t("message")}
        placeholder={t("messagePlaceholder")}
        required
        disabled={isPending}
        className="border-2"
      />

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
