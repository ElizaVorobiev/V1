import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Link, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareOptionsProps {
  challengeCode?: string;
  challengeLink?: string;
  onShare?: () => void;
}

const defaultProps: ShareOptionsProps = {
  challengeCode: "WORKOUT30",
  challengeLink: "https://herd.com/challenge/WORKOUT30",
  onShare: () => {},
};

export default function ShareOptions({
  challengeCode = defaultProps.challengeCode,
  onShare = defaultProps.onShare,
}: ShareOptionsProps) {
  const [copied, setCopied] = React.useState<"code" | "link" | null>(null);

  const joinLink = useMemo(() => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/join?code=${challengeCode}`;
  }, [challengeCode]);

  const handleCopy = async (text: string, type: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="p-6 bg-white space-y-6 rounded-xl card-shadow border-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Share Challenge
        </h2>
        <p className="text-sm text-muted-foreground">
          Invite friends to join your challenge
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Challenge Code</Label>
          <div className="flex gap-2">
            <Input
              value={challengeCode}
              readOnly
              className="font-mono bg-muted rounded-lg border-2 focus:border-primary"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(challengeCode, "code")}
                    className="rounded-lg"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied === "code" ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Share Link</Label>
          <div className="flex gap-2">
            <Input
              value={joinLink}
              readOnly
              className="bg-muted text-sm rounded-lg border-2 focus:border-primary"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(joinLink, "link")}
                    className="rounded-lg"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied === "link" ? "Copied!" : "Copy link"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full lime-button rounded-lg" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Challenge
          </Button>
        </div>
      </div>
    </Card>
  );
}
