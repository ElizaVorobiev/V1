import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Bell, Camera, MessageSquare, Target } from "lucide-react";

export default function Settings() {
  return (
    <div className="container max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to complete your challenges
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Group Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about group activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-lg font-semibold">Privacy</h2>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Private Profile</Label>
              <p className="text-sm text-muted-foreground">
                Only show profile to group members
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Progress</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your progress
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}
