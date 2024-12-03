import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Bell, Users, Trophy, Zap } from "lucide-react";

export default function Settings() {
  return (
    <div className="container max-w-lg mx-auto p-4 mb-20">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="p-4 space-y-6 rounded-xl card-shadow border-0">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <Label>Daily Reminders</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get reminded to complete your daily challenges
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <Label>Progress Updates</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                See when group members post their updates
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <Label>Nudges</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get motivated when others complete their challenges
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <Label>Leaderboard Updates</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified about changes in your ranking
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-lg font-semibold">Privacy</h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <Label>Private Profile</Label>
              <p className="text-sm text-muted-foreground">
                Only show profile to group members
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-primary" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1 mr-8">
              <Label>Share Progress</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your progress
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
