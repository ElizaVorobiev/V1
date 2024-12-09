import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Trophy, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  progress: {
    current: number;
    target: number;
    metric: string;
  };
  daysLeft: number;
}

// Mock challenge data - replace with API call
const mockChallenge: Challenge = {
  id: "1",
  title: "Morning Run Challenge",
  description:
    "30 days of morning runs to kickstart your day! Join us in building a healthy morning routine with daily runs.",
  participants: [
    {
      name: "Sarah Chen",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=SC",
      initials: "SC",
    },
    {
      name: "Mike Johnson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=MJ",
      initials: "MJ",
    },
  ],
  progress: {
    current: 750,
    target: 900,
    metric: "steps",
  },
  daysLeft: 12,
};

export default function JoinChallenge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [inviteCode, setInviteCode] = useState(searchParams.get("code") || "");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindChallenge = async () => {
    if (!inviteCode.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter an invite code",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setChallenge(mockChallenge);
      setIsLoading(false);
    }, 1000);
  };

  const handleJoinChallenge = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the challenge! 🎉",
        description: "You've successfully joined the challenge.",
      });
      navigate(`/challenge/${challenge?.id}`);
    }, 1000);
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <h1 className="text-2xl font-bold mb-6">Join Challenge</h1>

      <Card className="p-4 space-y-6 rounded-xl card-shadow border-0">
        <div className="space-y-2">
          <Label>Challenge Code</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="rounded-lg border-2 focus:border-primary"
            />
            <Button
              onClick={handleFindChallenge}
              className="lime-button rounded-lg whitespace-nowrap"
              disabled={isLoading}
            >
              Find Challenge
            </Button>
          </div>
        </div>

        {challenge && (
          <div className="space-y-6 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{challenge.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Group Progress</span>
                  <span className="font-medium">
                    {challenge.progress.current}/{challenge.progress.target}{" "}
                    {challenge.progress.metric}
                  </span>
                </div>
                <Progress
                  value={
                    (challenge.progress.current / challenge.progress.target) *
                    100
                  }
                  className="h-2"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  {challenge.participants.map((participant, index) => (
                    <Avatar
                      key={index}
                      className="border-2 border-background w-8 h-8"
                    >
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {challenge.daysLeft} days left
                </span>
              </div>
            </div>

            <Button
              className="w-full lime-button rounded-lg"
              onClick={handleJoinChallenge}
              disabled={isLoading}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Join Challenge
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
