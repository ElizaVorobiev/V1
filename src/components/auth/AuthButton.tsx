import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  variant?: "primary" | "secondary" | "outline";
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function AuthButton({
  variant = "primary",
  label = "Continue",
  icon,
  onClick = () => {},
  className = "",
  disabled = false,
}: AuthButtonProps) {
  const baseStyles =
    "w-full h-12 text-base font-semibold rounded-lg transition-all duration-200";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        "flex items-center justify-center gap-2",
        className,
      )}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </Button>
  );
}
