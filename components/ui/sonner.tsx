"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-background !text-foreground !border-primary/30 !shadow-[0_20px_50px_rgba(var(--primary),0.2)] !rounded-[20px] !p-5 !backdrop-blur-xl !border-[1.5px] font-cairo",
          description: "!text-muted-foreground font-medium text-sm",
          actionButton:
            "!bg-primary !text-primary-foreground font-bold !rounded-xl !px-4 !py-2",
          cancelButton:
            "!bg-muted !text-muted-foreground font-bold !rounded-xl !px-4 !py-2",
          success: "!border-primary !bg-primary/10 !text-primary",
          error: "!border-destructive !bg-destructive/10 !text-destructive",
        },
      }}
      icons={{
        success: <CheckCircle className="w-5 h-5 text-primary" />,
        error: <AlertCircle className="w-5 h-5 text-destructive" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
