import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface Participant {
  name: string;
  avatar: string;
  initials: string;
  progress: {
    current: number;
    target: number;
    metric: string;
  };
}

interface ChallengeLeaderboardProps {
  participants: Participant[];
}

export default function ChallengeLeaderboard({
  participants,
}: ChallengeLeaderboardProps) {
  // Sort participants by progress percentage
  const sortedParticipants = [...participants].sort((a, b) => {
    const aProgress = (a.progress.current / a.progress.target) * 100;
    const bProgress = (b.progress.current / b.progress.target) * 100;
    return bProgress - aProgress;
  });

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0:
        return "bg-[#FFD700] text-black";
      case 1:
        return "bg-[#C0C0C0] text-black";
      case 2:
        return "bg-[#CD7F32] text-black";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        Leaderboard
      </h3>
      <div className="space-y-3">
        {sortedParticipants.map((participant, index) => {
          const progressPercentage =
            (participant.progress.current / participant.progress.target) * 100;
          return (
            <div key={participant.name} className="flex items-center gap-4">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium ${getPositionStyle(index)}`}
              >
                {index + 1}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>{participant.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {participant.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {participant.progress.current}/{participant.progress.target}{" "}
                    {participant.progress.metric}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
