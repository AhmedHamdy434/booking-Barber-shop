"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Loader2 } from "lucide-react";
import { SocialAuth } from "./social-auth";

export function LoginForm({ locale }: { locale: string }) {
  const t = useTranslations("Auth");
  const [state, action, isPending] = useActionState(signIn, undefined);

  return (
    <Card className="w-full max-w-md mx-auto glass">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t("login")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("loginDesc")}
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <input type="hidden" name="locale" value={locale} />
        <CardContent className="space-y-4">
          <FormInput
            id="email"
            name="email"
            type="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            required
            disabled={isPending}
            defaultValue={state?.data?.email}
            error={state?.errors?.email}
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            required
            disabled={isPending}
            error={state?.errors?.password}
          />
          {state?.message && (
            <p className="text-sm text-center text-destructive bg-destructive/10 p-2 rounded">
              {state.message}
            </p>
          )}
          <SocialAuth locale={locale} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            variant="gold"
            className="w-full"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("login")}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-semibold"
            >
              {t("signup")}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
