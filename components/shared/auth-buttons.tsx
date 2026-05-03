"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { User, LogOut, Calendar, ChevronDown } from "lucide-react";
import { type User as SupabaseUser } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "./motion-elements";
import { signOut } from "@/actions/auth";
import { useClickOutside } from "@/hooks/use-click-outside";
import { ConfirmDialog } from "./confirm-dialog";

interface AuthButtonsProps {
  user: SupabaseUser | null;
  locale: string;
}

export function AuthButtons({ user, locale }: AuthButtonsProps) {
  const tNav = useTranslations("Nav");
  const tAuth = useTranslations("Auth");
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleLogout = () => {
    signOut(locale);
  };

  if (user) {
    return (
      <div className="w-[170px] flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-full border border-border/50 pr-4 hover:bg-primary/10 hover:text-primary transition-all duration-300 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="max-w-[100px] truncate text-xs font-bold uppercase tracking-tight">
              {user.user_metadata?.full_name?.split(" ")[0] || tAuth("profile")}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>

          <AnimatePresence>
            {isOpen && (
              <MotionDiv
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute inset-e-0 mt-2 w-56 origin-top-right rounded-2xl border bg-card p-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50"
              >
                <div className="px-3 py-2 border-b mb-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {tAuth("profile")}
                  </p>
                  <p className="text-sm font-bold truncate">{user.email}</p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    {tNav("myBookings")}
                  </Link>
                </div>

                <div className="mt-1 pt-1 border-t">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {tAuth("logout")}
                  </button>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>

          <ConfirmDialog
            isOpen={showLogoutConfirm}
            onClose={() => setShowLogoutConfirm(false)}
            onConfirm={handleLogout}
            title={tAuth("logout")}
            description={tAuth("logoutConfirm")}
            confirmText={tAuth("yesLogout")}
            cancelText={tAuth("cancel")}
            variant="destructive"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[170px] flex justify-end">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hidden sm:inline-flex"
          aria-label={tAuth("login")}
        >
          <Link href="/login">{tAuth("login")}</Link>
        </Button>
        <Button
          variant="gold"
          size="sm"
          asChild
          className="rounded-full px-5"
          aria-label={tAuth("signup")}
        >
          <Link href="/signup">{tAuth("signup")}</Link>
        </Button>
      </div>
    </div>
  );
}
