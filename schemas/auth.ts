import { z } from "zod";

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(6, t("errors.passwordMin")),
  });

export const getSignupSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(2, t("errors.fullNameMin")),
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(6, t("errors.passwordMin")),
  });

export type LoginInput = z.infer<ReturnType<typeof getLoginSchema>>;
export type SignupInput = z.infer<ReturnType<typeof getSignupSchema>>;
