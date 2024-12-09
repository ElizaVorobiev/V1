import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Camera, X, Hand, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Challenge {
  id: string;
  title: string;
  metric: string;
  target: number;
  participants: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
    hasCompletedToday: boolean;
  }[];
}

// Mock data - replace with real data
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Morning Run Challenge",
    metric: "steps",
    target: 10000,
    participants: [
      {
        id: "1",
        name: "Sarah Chen",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=SC",
        initials: "SC",
        hasCompletedToday: true,
      },
      {
        id: "2",
        name: "Mike Johnson",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=MJ",
        initials: "MJ",
        hasCompletedToday: true,
      },
      {
        id: "3",
        name: "Alex Kim",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=AK",
        initials: "AK",
        hasCompletedToday: false,
      },
    ],
  },
  {
    id: "2",
    title: "Strength Training",
    metric: "calories",
    target: 500,
    participants: [
      {
        id: "4",
        name: "Emma Wilson",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=EW",
        initials: "EW",
        hasCompletedToday: true,
      },
      {
        id: "5",
        name: "David Lee",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=DL",
        initials: "DL",
        hasCompletedToday: false,
      },
    ],
  },
];

export default function UpdateProgress() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [metricValue, setMetricValue] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedParticipantsToNudge, setSelectedParticipantsToNudge] =
    useState<Set<string>>(new Set());

  const currentChallenge = mockChallenges.find(
    (c) => c.id === selectedChallenge,
  );
  const incompleteParticipants =
    currentChallenge?.participants.filter((p) => !p.hasCompletedToday) || [];

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
    if (!selectedChallenge || !metricValue || !photoPreview) {
      toast({
        variant: "destructive",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Here you would normally send the update to your backend
    console.log({
      challengeId: selectedChallenge,
      metricValue,
      comment,
      hasPhoto: !!photoPreview,
    });

    setShowSuccessDialog(true);
  };

  const toggleParticipantNudge = (participantId: string) => {
    setSelectedParticipantsToNudge((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(participantId)) {
        newSet.delete(participantId);
      } else {
        newSet.add(participantId);
      }
      return newSet;
    });
  };

  const handleNudgeAndFinish = () => {
    if (selectedParticipantsToNudge.size > 0) {
      const nudgedNames = incompleteParticipants
        .filter((p) => selectedParticipantsToNudge.has(p.id))
        .map((p) => p.name)
        .join(", ");

      toast({
        title: "Nudges Sent!",
        description: `You've nudged ${nudgedNames} to complete their challenge!`,
      });
    }

    setShowSuccessDialog(false);
    navigate("/");
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

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Posted! 🎉</DialogTitle>
            <DialogDescription className="pt-2">
              Great job on completing your challenge! Would you like to nudge
              others who haven't completed their challenge today?
            </DialogDescription>
          </DialogHeader>

          {incompleteParticipants.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {incompleteParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    onClick={() => toggleParticipantNudge(participant.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{participant.name}</span>
                    </div>
                    <Button
                      variant={
                        selectedParticipantsToNudge.has(participant.id)
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                      className="rounded-lg"
                    >
                      <Hand className="h-4 w-4 mr-2" />
                      {selectedParticipantsToNudge.has(participant.id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="w-full lime-button rounded-lg"
                onClick={handleNudgeAndFinish}
              >
                {selectedParticipantsToNudge.size > 0 ? (
                  <>
                    <Hand className="h-4 w-4 mr-2" />
                    Send Nudges & Finish
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Skip & Finish
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              className="w-full lime-button rounded-lg"
              onClick={() => navigate("/")}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Continue
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
