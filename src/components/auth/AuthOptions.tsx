import React from "react";
import { Card } from "@/components/ui/card";
import AuthButton from "./AuthButton";
import { LogIn, UserPlus } from "lucide-react";

interface AuthOptionsProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  showLoginForm?: boolean;
  showSignUpForm?: boolean;
}

export default function AuthOptions({
  onLoginClick = () => {},
  onSignUpClick = () => {},
  showLoginForm = false,
  showSignUpForm = false,
}: AuthOptionsProps) {
  return (
    <Card className="w-full max-w-[400px] p-6 space-y-4 bg-white border-0 rounded-xl card-shadow">
      {!showLoginForm && !showSignUpForm && (
        <div className="space-y-4">
          <AuthButton
            variant="primary"
            label="Log In"
            icon={<LogIn className="w-5 h-5" />}
            onClick={onLoginClick}
          />
          <AuthButton
            variant="outline"
            label="Sign Up"
            icon={<UserPlus className="w-5 h-5" />}
            onClick={onSignUpClick}
          />
        </div>
      )}
    </Card>
  );
}
