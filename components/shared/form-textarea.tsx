"use client";

import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  error?: string[] | string;
  rows?: number;
  className?: string;
}

export function FormTextarea({
  id,
  name,
  label,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  rows = 5,
  className,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium leading-none">
        {label}
      </label>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        rows={rows}
        className={className}
      />
      {error && (
        <p className="text-xs text-destructive">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}
