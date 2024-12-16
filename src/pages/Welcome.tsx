import React from "react";
import WelcomeHero from "@/components/auth/WelcomeHero";
import AuthOptions from "@/components/auth/AuthOptions";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import EmailVerification from "@/components/auth/EmailVerification";
import ProfileSetup from "@/components/auth/ProfileSetup";

type AuthStep = "initial" | "login" | "signup" | "verify" | "profile";

export default function Welcome() {
  const [currentStep, setCurrentStep] = React.useState<AuthStep>("initial");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLoginClick = () => {
    setCurrentStep("login");
    setError("");
  };

  const handleSignUpClick = () => {
    setCurrentStep("signup");
    setError("");
  };

  const handleLoginSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail(data.email);
      setCurrentStep("profile");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail(data.email);
      setCurrentStep("verify");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect to dashboard or next step
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WelcomeHero />

      <div className="flex flex-col items-center justify-center px-4 py-8 -mt-20">
        {currentStep === "initial" && (
          <AuthOptions
            onLoginClick={handleLoginClick}
            onSignUpClick={handleSignUpClick}
          />
        )}

        {currentStep === "login" && (
          <LoginForm
            onSubmit={handleLoginSubmit}
            loading={loading}
            error={error}
          />
        )}

        {currentStep === "signup" && (
          <SignUpForm
            onSubmit={handleSignUpSubmit}
            loading={loading}
            error={error}
          />
        )}

        {currentStep === "verify" && (
          <EmailVerification
            email={email}
            onResendEmail={handleResendEmail}
            loading={loading}
            error={error}
          />
        )}

        {currentStep === "profile" && (
          <ProfileSetup
            onSubmit={handleProfileSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
