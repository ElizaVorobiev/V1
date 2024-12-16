import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarUploadProps {
  imageUrl?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  loading?: boolean;
  error?: string;
}

export default function AvatarUpload({
  imageUrl = "",
  onUpload = () => {},
  onRemove = () => {},
  loading = false,
  error = "",
}: AvatarUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Card className="w-full max-w-[320px] p-4 space-y-4 bg-white border-0 rounded-xl card-shadow">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-16 h-16 border-2 border-primary">
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt="Profile picture" />
            ) : (
              <AvatarFallback className="bg-primary/10">
                <Camera className="w-6 h-6 text-primary" />
              </AvatarFallback>
            )}
          </Avatar>

          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-lg"
            onClick={handleClick}
            disabled={loading}
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">Profile Picture</p>
          <p className="text-xs text-muted-foreground">
            Upload a photo for your profile
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />

      {imageUrl && (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-destructive hover:text-destructive"
          onClick={onRemove}
          disabled={loading}
        >
          Remove photo
        </Button>
      )}
    </Card>
  );
}
