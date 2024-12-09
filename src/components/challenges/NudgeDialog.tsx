import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hand } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  progress: {
    current: number;
    target: number;
    metric: string;
  };
}

interface NudgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: Participant[];
  challengeTitle: string;
  onNudge: (participantId: string) => void;
}

export default function NudgeDialog({
  open,
  onOpenChange,
  participants,
  challengeTitle,
  onNudge,
}: NudgeDialogProps) {
  const { toast } = useToast();
  const [nudgedParticipants, setNudgedParticipants] = useState<Set<string>>(
    new Set(),
  );

  const handleNudge = (participant: Participant) => {
    if (nudgedParticipants.has(participant.id)) {
      toast({
        description: `You've already nudged ${participant.name} recently.`,
      });
      return;
    }

    onNudge(participant.id);
    setNudgedParticipants((prev) => new Set([...prev, participant.id]));
    toast({
      description: `Nudge sent to ${participant.name}! 🎯`,
    });
  };

  // Sort participants by progress percentage
  const sortedParticipants = [...participants].sort((a, b) => {
    const aProgress = (a.progress.current / a.progress.target) * 100;
    const bProgress = (b.progress.current / b.progress.target) * 100;
    return aProgress - bProgress; // Sort ascending to show those who need nudges first
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Send Nudges</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Encourage participants who might need a little motivation in{" "}
            <span className="font-medium text-foreground">
              {challengeTitle}
            </span>
          </p>

          <div className="space-y-2">
            {sortedParticipants.map((participant) => {
              const progressPercentage =
                (participant.progress.current / participant.progress.target) *
                100;
              const isNudged = nudgedParticipants.has(participant.id);

              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{participant.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {participant.progress.current}/
                        {participant.progress.target}{" "}
                        {participant.progress.metric} (
                        {progressPercentage.toFixed(0)}
                        %)
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isNudged ? "secondary" : "default"}
                    size="sm"
                    onClick={() => handleNudge(participant)}
                    disabled={isNudged}
                    className="rounded-lg"
                  >
                    <Hand className="h-4 w-4 mr-2" />
                    {isNudged ? "Nudged" : "Nudge"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
