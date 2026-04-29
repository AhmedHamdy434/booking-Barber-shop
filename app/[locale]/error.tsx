"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-destructive/5">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">
            Something went <span className="text-destructive">wrong</span>
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not you, it&apos;s us.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/50 mt-4 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
            size="lg"
            className="rounded-full gap-2 px-8"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full gap-2 px-8"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
