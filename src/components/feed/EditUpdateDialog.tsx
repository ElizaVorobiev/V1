import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X, Save } from "lucide-react";

interface EditUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  update: {
    content?: {
      text?: string;
      image?: string;
    };
    challenge: {
      progress?: number;
      target?: number;
      metric?: string;
    };
  };
  onSave: (data: { text: string; progress: number; image: string }) => void;
}

export default function EditUpdateDialog({
  open,
  onOpenChange,
  update,
  onSave,
}: EditUpdateDialogProps) {
  const [text, setText] = useState(update.content?.text || "");
  const [progress, setProgress] = useState(
    update.challenge.progress?.toString() || "",
  );
  const [image, setImage] = useState(update.content?.image || "");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!text.trim() || !progress || !image) return;

    onSave({
      text: text.trim(),
      progress: parseInt(progress),
      image,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Update</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Progress</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="rounded-lg border-2 focus:border-primary"
              />
              <span className="flex items-center text-muted-foreground">
                {update.challenge.metric}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Photo</Label>
            <div className="relative">
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Update"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() => setImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Camera className="h-8 w-8" />
                    <span>Click to upload photo</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Comment</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How was your workout?"
              className="min-h-[100px] rounded-lg border-2 focus:border-primary"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full lime-button rounded-lg"
            onClick={handleSave}
            disabled={!text.trim() || !progress || !image}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
