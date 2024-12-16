import React from "react";
import { Card } from "@/components/ui/card";
import FormField from "./FormField";
import AuthButton from "./AuthButton";
import { LogIn } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({
  onSubmit = () => {},
  onForgotPassword = () => {},
  loading = false,
  error = "",
}: LoginFormProps) {
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-[400px] p-6 space-y-6 bg-white border-0 rounded-xl card-shadow">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="pt-2">
          <AuthButton
            variant="primary"
            label={loading ? "Logging in..." : "Log In"}
            icon={<LogIn className="w-5 h-5" />}
            disabled={loading}
            type="submit"
          />
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className="w-full text-sm text-primary hover:text-primary/90 transition-colors"
        >
          Forgot your password?
        </button>
      </form>
    </Card>
  );
}
