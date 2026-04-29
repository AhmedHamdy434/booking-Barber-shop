"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { User, LogOut, Calendar } from "lucide-react";
import { signOut } from "@/actions/auth";
import { type User as SupabaseUser } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "./motion-elements";

interface AuthButtonsProps {
  user: SupabaseUser | null;
  locale: string;
}

export function AuthButtons({ user, locale }: AuthButtonsProps) {
  const tNav = useTranslations("Nav");
  const tAuth = useTranslations("Auth");
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (user) {
    return (
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 rounded-full border border-border/50 pr-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="max-w-[100px] truncate text-xs font-bold uppercase tracking-tight">
            {user.user_metadata?.full_name?.split(' ')[0] || tAuth('profile')}
          </span>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay to close on click outside */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => {
                  setIsOpen(false);
                  setShowConfirm(false);
                }} 
              />
              
              <MotionDiv
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {!showConfirm ? (
                  <div className="p-2 flex flex-col gap-1">
                    <Link 
                      href="/my-bookings" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {tNav("myBookings")}
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      {tAuth('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-xs font-bold text-center">{tAuth('logoutConfirm')}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="flex-1 rounded-lg text-[10px]"
                        onClick={() => signOut(locale)}
                      >
                        {tAuth('yesLogout')}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 rounded-lg text-[10px]"
                        onClick={() => setShowConfirm(false)}
                      >
                        {tAuth('cancel')}
                      </Button>
                    </div>
                  </div>
                )}
              </MotionDiv>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex" aria-label={tAuth("login")}>
        <Link href="/login">{tAuth("login")}</Link>
      </Button>
      <Button variant="gold" size="sm" asChild className="rounded-full px-5" aria-label={tAuth("signup")}>
        <Link href="/signup">{tAuth("signup")}</Link>
      </Button>
    </div>
  );
}
