import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GroupChallenge {
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

// Mock data - replace with real data
const mockChallenges: GroupChallenge[] = [
  {
    id: "1",
    title: "Morning Run Challenge",
    description: "30 days of morning runs to kickstart your day!",
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
      {
        name: "Alex Kim",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=AK",
        initials: "AK",
      },
    ],
    progress: {
      current: 750,
      target: 900,
      metric: "steps",
    },
    daysLeft: 12,
  },
  {
    id: "2",
    title: "Strength Training",
    description: "Build strength together with daily workouts",
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
      current: 600,
      target: 800,
      metric: "calories",
    },
    daysLeft: 18,
  },
];

export default function Groups() {
  const navigate = useNavigate();
  const [challenges] = useState<GroupChallenge[]>(mockChallenges);

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Groups</h1>
        <Button
          onClick={() => navigate("/create-challenge")}
          className="lime-button rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="p-4 space-y-4 rounded-xl card-shadow border-0 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span>#{Math.floor(Math.random() * 3) + 1}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
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

            <div className="flex items-center justify-between pt-2 border-t">
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
          </Card>
        ))}
      </div>
    </div>
  );
}
