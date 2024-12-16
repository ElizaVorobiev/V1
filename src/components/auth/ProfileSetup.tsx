import React from "react";
import { Card } from "@/components/ui/card";
import FormField from "./FormField";
import AuthButton from "./AuthButton";
import AvatarUpload from "./AvatarUpload";
import { UserCheck } from "lucide-react";

interface ProfileSetupProps {
  onSubmit?: (data: ProfileSetupData) => void;
  loading?: boolean;
  error?: string;
}

export interface ProfileSetupData {
  fullName: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

const defaultData: ProfileSetupData = {
  fullName: "",
  username: "",
  bio: "",
  avatarUrl: "",
};

export default function ProfileSetup({
  onSubmit = () => {},
  loading = false,
  error = "",
}: ProfileSetupProps) {
  const [formData, setFormData] = React.useState<ProfileSetupData>(defaultData);

  const [validationErrors, setValidationErrors] = React.useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatarUpload = (file: File) => {
    // In a real app, you would upload the file to a server and get a URL back
    const tempUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatarUrl: tempUrl }));
  };

  const handleAvatarRemove = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const validateForm = () => {
    const errors = {
      fullName: "",
      username: "",
      bio: "",
    };

    if (formData.fullName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters long";
    }

    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (formData.bio.length > 160) {
      errors.bio = "Bio must be less than 160 characters";
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
        <h2 className="text-2xl font-bold tracking-tight">
          Complete Your Profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Add some details to help others recognize you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <AvatarUpload
            imageUrl={formData.avatarUrl}
            onUpload={handleAvatarUpload}
            onRemove={handleAvatarRemove}
            loading={loading}
          />
        </div>

        <div className="space-y-4">
          <FormField
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={validationErrors.fullName}
            required
          />

          <FormField
            label="Username"
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            error={validationErrors.username}
            required
          />

          <FormField
            label="Bio"
            type="text"
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
            error={validationErrors.bio}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="pt-2">
          <AuthButton
            variant="primary"
            label={loading ? "Saving..." : "Complete Setup"}
            icon={<UserCheck className="w-5 h-5" />}
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </Card>
  );
}
