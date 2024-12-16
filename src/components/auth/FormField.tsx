import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export default function FormField({
  label = "Field Label",
  type = "text",
  placeholder = "Enter value",
  error = "",
  value = "",
  onChange = () => {},
  required = false,
  disabled = false,
  className = "",
  name = "",
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2 w-full bg-white", className)}>
      <Label
        htmlFor={name}
        className="text-sm font-medium flex items-center justify-between"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      <div className="relative">
        <Input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full h-10 px-3 rounded-lg border-2 transition-colors duration-200",
            error
              ? "border-destructive focus:border-destructive"
              : "border-input focus:border-primary",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        />

        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
