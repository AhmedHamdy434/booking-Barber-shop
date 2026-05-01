"use server";

import { createClient } from "@/lib/supabase/server";
import { getLoginSchema, getSignupSchema } from "@/schemas/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signIn(_prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const locale = (formData.get("locale") as string) || "en";

  const t = await getTranslations({ locale, namespace: "Auth" });
  const loginSchema = getLoginSchema(t);
  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      data: { email }
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      message: error.message,
      data: { email }
    };
  }

  revalidatePath("/", "layout");
  redirect(`/${locale}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const locale = (formData.get("locale") as string) || "en";

  const t = await getTranslations({ locale, namespace: "Auth" });
  const signupSchema = getSignupSchema(t);
  const validatedFields = signupSchema.safeParse({ email, password, fullName });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      data: { email, fullName }
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return {
      message: error.message,
      data: { email, fullName }
    };
  }

  revalidatePath("/", "layout");
  redirect(`/${locale}`);
}

export async function signInWithGoogle(origin: string, locale: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/${locale}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut(locale: string = "en") {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${locale}/login`);
}
