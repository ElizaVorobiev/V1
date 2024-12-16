import React from "react";
import { Card } from "@/components/ui/card";
import FormField from "./FormField";
import AuthButton from "./AuthButton";
import { UserPlus } from "lucide-react";

interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void;
  loading?: boolean;
  error?: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm({
  onSubmit = () => {},
  loading = false,
  error = "",
}: SignUpFormProps) {
  const [formData, setFormData] = React.useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation errors when user types
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-[400px] p-6 space-y-6 bg-white border-0 rounded-xl card-shadow">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details to get started
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
          error={validationErrors.email}
          required
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
          required
        />

        <FormField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={validationErrors.confirmPassword}
          required
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="pt-2">
          <AuthButton
            variant="primary"
            label={loading ? "Creating account..." : "Sign Up"}
            icon={<UserPlus className="w-5 h-5" />}
            disabled={loading}
            type="submit"
          />
        </div>

        <p className="text-sm text-center text-muted-foreground">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Privacy Policy
          </a>
        </p>
      </form>
    </Card>
  );
}
