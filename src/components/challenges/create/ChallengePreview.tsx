import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Camera, MessageSquare, Target } from "lucide-react";

interface ChallengePreviewProps {
  title?: string;
  description?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  metricType?: string;
  metricTarget?: string;
  requirements?: {
    requirePhoto: boolean;
    requireComment: boolean;
    requireMetric: boolean;
  };
}

const defaultProps: ChallengePreviewProps = {
  title: "30 Day Workout Challenge",
  description: "Join me in completing daily workouts for the next 30 days!",
  dateRange: {
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
  metricType: "count",
  metricTarget: "30",
  requirements: {
    requirePhoto: true,
    requireComment: true,
    requireMetric: true,
  },
};

export default function ChallengePreview({
  title = defaultProps.title,
  description = defaultProps.description,
  dateRange = defaultProps.dateRange,
  metricType = defaultProps.metricType,
  metricTarget = defaultProps.metricTarget,
  requirements = defaultProps.requirements,
}: ChallengePreviewProps) {
  return (
    <Card className="p-6 bg-white space-y-6 rounded-xl card-shadow border-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Challenge Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Here's how your challenge will appear to participants
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://dummyimage.com/100/6366f1/ffffff&text=HC" />
            <AvatarFallback>HC</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              0/{metricTarget} {metricType}s
            </span>
          </div>
          <Progress value={65} className="h-2 bg-muted" />
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="text-sm">
            <span className="font-medium">Duration: </span>
            <span className="text-muted-foreground">
              {format(dateRange.from, "MMM d")} -{" "}
              {format(dateRange.to, "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {requirements.requirePhoto && (
              <div className="requirement-chip requirement-chip-photo">
                <Camera className="h-3 w-3" />
                <span>Photo</span>
              </div>
            )}
            {requirements.requireComment && (
              <div className="requirement-chip requirement-chip-comment">
                <MessageSquare className="h-3 w-3" />
                <span>Comment</span>
              </div>
            )}
            {requirements.requireMetric && (
              <div className="requirement-chip requirement-chip-metric">
                <Target className="h-3 w-3" />
                <span>Metric</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
