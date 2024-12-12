import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Trophy } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChallengeBasicInfo from "@/components/challenges/create/ChallengeBasicInfo";
import MetricConfig from "@/components/challenges/create/MetricConfig";
import UpdateRequirements from "@/components/challenges/create/UpdateRequirements";
import ChallengePreview from "@/components/challenges/create/ChallengePreview";
import ShareOptions from "@/components/challenges/create/ShareOptions";

interface GroupChallenge {
  id: string;
  title: string;
  description: string;
  participants: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  startDate: Date;
  endDate: Date;
  completedDays: number;
  totalDays: number;
  metric: string;
  target: number;
  daysLeft: number;
}

interface ChallengeFormData {
  basicInfo: {
    title: string;
    description: string;
    dateRange: {
      from: Date;
      to: Date;
    };
  };
  metrics: {
    metricType: string;
    metricTarget: string;
  };
  requirements: {
    requirePhoto: boolean;
    requireComment: boolean;
    requireMetric: boolean;
  };
}

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
    ],
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 30),
    completedDays: 18,
    totalDays: 30,
    metric: "steps",
    target: 900,
    daysLeft: 12,
  },
  {
    id: "2",
    title: "Strength Training",
    description: "Build strength with daily workouts",
    participants: [
      {
        name: "Alex Kim",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=AK",
        initials: "AK",
      },
      {
        name: "Emma Wilson",
        avatar: "https://dummyimage.com/100/6366f1/ffffff&text=EW",
        initials: "EW",
      },
    ],
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 1, 15),
    completedDays: 5,
    totalDays: 30,
    metric: "calories",
    target: 800,
    daysLeft: 25,
  },
];

export default function Groups() {
  const navigate = useNavigate();
  const [challenges] = useState<GroupChallenge[]>(mockChallenges);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ChallengeFormData>({
    basicInfo: {
      title: "",
      description: "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    },
    metrics: {
      metricType: "steps",
      metricTarget: "900",
    },
    requirements: {
      requirePhoto: true,
      requireComment: false,
      requireMetric: true,
    },
  });

  const handleBasicInfoSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, basicInfo: data }));
  };

  const handleMetricSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, metrics: data }));
  };

  const handleRequirementsSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, requirements: data }));
  };

  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Challenges</h1>
        <Button
          onClick={() => setCreateDialogOpen(true)}
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
            onClick={() => navigate(`/challenge/${challenge.id}`)}
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
                  {challenge.completedDays}/{challenge.totalDays} days completed
                </span>
              </div>
              <Progress
                value={(challenge.completedDays / challenge.totalDays) * 100}
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

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <div className="space-y-6">
            <ChallengeBasicInfo
              onSubmit={handleBasicInfoSubmit}
              initialData={formData.basicInfo}
            />

            <MetricConfig
              onSubmit={handleMetricSubmit}
              initialData={formData.metrics}
            />

            <UpdateRequirements
              onSubmit={handleRequirementsSubmit}
              initialData={formData.requirements}
            />

            <ChallengePreview
              title={formData.basicInfo.title}
              description={formData.basicInfo.description}
              dateRange={formData.basicInfo.dateRange}
              metricType={formData.metrics.metricType}
              metricTarget={formData.metrics.metricTarget}
              requirements={formData.requirements}
            />

            <ShareOptions />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
