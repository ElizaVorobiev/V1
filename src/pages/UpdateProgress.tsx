import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, X } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  metric: string;
  target: number;
}

// Mock data - replace with real data
const mockChallenges: Challenge[] = [
  { id: "1", title: "Morning Run Challenge", metric: "steps", target: 10000 },
  { id: "2", title: "Strength Training", metric: "calories", target: 500 },
];

export default function UpdateProgress() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [metricValue, setMetricValue] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log({
      challengeId: selectedChallenge,
      metricValue,
      comment,
      hasPhoto: !!photoPreview,
    });
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <h1 className="text-2xl font-bold mb-6">Update Progress</h1>

      <form onSubmit={handleSubmit}>
        <Card className="p-4 space-y-6 rounded-xl card-shadow border-0">
          <div className="space-y-2">
            <Label>Select Challenge</Label>
            <Select
              value={selectedChallenge}
              onValueChange={setSelectedChallenge}
            >
              <SelectTrigger className="w-full rounded-lg border-2 focus:border-primary">
                <SelectValue placeholder="Choose a challenge" />
              </SelectTrigger>
              <SelectContent>
                {mockChallenges.map((challenge) => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedChallenge && (
            <div className="space-y-2">
              <Label>Progress</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  className="rounded-lg border-2 focus:border-primary"
                />
                <span className="flex items-center text-muted-foreground">
                  {
                    mockChallenges.find((c) => c.id === selectedChallenge)
                      ?.metric
                  }
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Add Photo</Label>
            <div className="relative">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() => setPhotoPreview("")}
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
              placeholder="How was your workout?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] rounded-lg border-2 focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full lime-button rounded-lg"
            disabled={!selectedChallenge}
          >
            Post Update
          </Button>
        </Card>
      </form>
    </div>
  );
}
