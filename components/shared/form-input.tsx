"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  error?: string[] | string;
  className?: string;
}


export function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  className,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium leading-none">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        className={cn("text-left rtl:placeholder:text-right", className)}
      />
      {error && (
        <p className="text-xs text-destructive">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}
