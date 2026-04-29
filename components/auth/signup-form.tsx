"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Loader2 } from "lucide-react";

export function SignupForm({ locale }: { locale: string }) {
  const t = useTranslations("Auth");
  const [state, action, isPending] = useActionState(signUp, undefined);

  return (
    <Card className="w-full max-w-md mx-auto glass">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t("signup")}</CardTitle>
        <CardDescription className="text-center">
          {t("signupDesc")}
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <input type="hidden" name="locale" value={locale} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="fullName">
              {t("fullName")}
            </label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              required
              disabled={isPending}
            />
            {state?.errors?.fullName && (
              <p className="text-xs text-destructive">{state.errors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              {t("email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isPending}
            />
            {state?.errors?.email && (
              <p className="text-xs text-destructive">{state.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              {t("password")}
            </label>
            <Input id="password" name="password" type="password" required disabled={isPending} />
            {state?.errors?.password && (
              <p className="text-xs text-destructive">{state.errors.password}</p>
            )}
          </div>
          {state?.message && (
            <p className="text-sm text-center text-destructive bg-destructive/10 p-2 rounded">
              {state.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" variant="gold" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("signup")}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              {t("login")}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
