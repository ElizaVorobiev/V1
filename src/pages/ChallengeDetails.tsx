import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Pencil, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ActivityFeed from "@/components/feed/ActivityFeed";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChallengeBasicInfo from "@/components/challenges/create/ChallengeBasicInfo";
import MetricConfig from "@/components/challenges/create/MetricConfig";
import UpdateRequirements from "@/components/challenges/create/UpdateRequirements";
import ShareOptions from "@/components/challenges/create/ShareOptions";

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
    {
      name: "Emma Wilson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=EW",
      initials: "EW",
      progress: { current: 450, target: 900, metric: "steps" },
    },
    {
      name: "David Lee",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=DL",
      initials: "DL",
      progress: { current: 300, target: 900, metric: "steps" },
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  // Sort participants by progress percentage
  const sortedParticipants = [...challenge.participants].sort((a, b) => {
    const aProgress = (a.progress.current / a.progress.target) * 100;
    const bProgress = (b.progress.current / b.progress.target) * 100;
    return bProgress - aProgress;
  });

  const handleBasicInfoSubmit = (data: any) => {
    console.log("Basic info updated:", data);
  };

  const handleMetricSubmit = (data: any) => {
    console.log("Metrics updated:", data);
  };

  const handleRequirementsSubmit = (data: any) => {
    console.log("Requirements updated:", data);
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setEditDialogOpen(true)}
          className="rounded-full hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
        </Button>
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

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setInviteDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Friends
        </Button>
      </Card>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card className="p-4 rounded-xl card-shadow border-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">All Participants</h3>
              </div>
              <div className="space-y-3">
                {sortedParticipants.map((participant, index) => {
                  const progressPercentage =
                    (participant.progress.current /
                      participant.progress.target) *
                    100;
                  return (
                    <div key={participant.name} className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium ${
                            index === 0
                              ? "bg-[#FFD700] text-black"
                              : index === 1
                                ? "bg-[#C0C0C0] text-black"
                                : index === 2
                                  ? "bg-[#CD7F32] text-black"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">
                              {participant.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {participant.progress.current}/
                              {participant.progress.target}{" "}
                              {participant.progress.metric}
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed challengeId={id} />
        </TabsContent>
      </Tabs>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Challenge</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <ChallengeBasicInfo
              onSubmit={handleBasicInfoSubmit}
              initialData={{
                title: challenge.title,
                description: challenge.description,
                dateRange: {
                  from: new Date(),
                  to: new Date(
                    new Date().setDate(
                      new Date().getDate() + challenge.daysLeft,
                    ),
                  ),
                },
              }}
            />

            <MetricConfig
              onSubmit={handleMetricSubmit}
              initialData={{
                metricType: challenge.progress.metric,
                metricTarget: challenge.progress.target.toString(),
              }}
            />

            <UpdateRequirements
              onSubmit={handleRequirementsSubmit}
              initialData={{
                requirePhoto: true,
                requireComment: false,
                requireMetric: true,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Invite Friends</DialogTitle>
          </DialogHeader>
          <ShareOptions
            challengeCode={challenge.id}
            challengeLink={`https://herd.com/challenge/${challenge.id}`}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
