import React from "react";
import { Card } from "@/components/ui/card";
import AuthButton from "./AuthButton";
import { Mail, MailCheck } from "lucide-react";

interface EmailVerificationProps {
  email?: string;
  onResendEmail?: () => void;
  loading?: boolean;
  error?: string;
  verificationSent?: boolean;
}

export default function EmailVerification({
  email = "user@example.com",
  onResendEmail = () => {},
  loading = false,
  error = "",
  verificationSent = false,
}: EmailVerificationProps) {
  return (
    <Card className="w-full max-w-[400px] p-6 space-y-6 bg-white border-0 rounded-xl card-shadow">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {verificationSent ? (
            <MailCheck className="w-8 h-8 text-primary" />
          ) : (
            <Mail className="w-8 h-8 text-primary" />
          )}
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {verificationSent ? "Verification email sent!" : "Check your email"}
          </h2>
          <p className="text-sm text-muted-foreground">
            We sent a verification link to <br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <AuthButton
          variant="outline"
          label={loading ? "Sending..." : "Resend verification email"}
          icon={<Mail className="w-5 h-5" />}
          onClick={onResendEmail}
          disabled={loading}
        />

        <p className="text-sm text-center text-muted-foreground">
          Didn't receive an email? Check your spam folder or{" "}
          <button
            onClick={onResendEmail}
            className="text-primary hover:text-primary/90 font-medium"
          >
            try another email address
          </button>
        </p>
      </div>
    </Card>
  );
}
