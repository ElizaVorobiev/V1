import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import ChallengeLeaderboard from "@/components/challenges/ChallengeLeaderboard";
import ActivityFeed from "@/components/feed/ActivityFeed";

// Mock data - replace with real data fetching
const mockChallenge = {
  id: "1",
  title: "Morning Run Challenge",
  description:
    "30 days of morning runs to kickstart your day! Join us in building a healthy morning routine with daily runs. Track your steps, share your progress, and motivate each other to reach new fitness goals.",
  participants: [
    {
      name: "Sarah Chen",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=SC",
      initials: "SC",
      progress: { current: 750, target: 900, metric: "steps" },
    },
    {
      name: "Mike Johnson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=MJ",
      initials: "MJ",
      progress: { current: 800, target: 900, metric: "steps" },
    },
    {
      name: "Alex Kim",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=AK",
      initials: "AK",
      progress: { current: 600, target: 900, metric: "steps" },
    },
  ],
  progress: {
    current: 750,
    target: 900,
    metric: "steps",
  },
  daysLeft: 12,
};

export default function ChallengeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge] = useState(mockChallenge); // Replace with real data fetching

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/groups")}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{challenge.title}</h1>
          <p className="text-sm text-muted-foreground">
            {challenge.daysLeft} days remaining
          </p>
        </div>
      </div>

      <Card className="p-4 mb-6 space-y-4 rounded-xl card-shadow border-0">
        <div className="space-y-2">
          <h3 className="font-semibold">Challenge Description</h3>
          <p className="text-sm text-muted-foreground">
            {challenge.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">
              {challenge.progress.current}/{challenge.progress.target}{" "}
              {challenge.progress.metric}
            </span>
          </div>
          <Progress
            value={
              (challenge.progress.current / challenge.progress.target) * 100
            }
            className="h-2"
          />
        </div>
      </Card>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card className="p-4 rounded-xl card-shadow border-0">
            <ChallengeLeaderboard participants={challenge.participants} />
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed challengeId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
