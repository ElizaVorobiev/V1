import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface UpdateRequirementsProps {
  onSubmit?: (data: UpdateRequirementsData) => void;
  initialData?: Partial<UpdateRequirementsData>;
}

export interface UpdateRequirementsData {
  requirePhoto: boolean;
  requireComment: boolean;
  requireMetric: boolean;
}

const defaultData: UpdateRequirementsData = {
  requirePhoto: true,
  requireComment: false,
  requireMetric: true,
};

export default function UpdateRequirements({
  onSubmit = () => {},
  initialData = defaultData,
}: UpdateRequirementsProps) {
  const { handleSubmit } = useForm<UpdateRequirementsData>({
    defaultValues: initialData,
  });

  const [requirements, setRequirements] =
    React.useState<UpdateRequirementsData>({
      ...defaultData,
      ...initialData,
    });

  const handleToggle = (field: keyof UpdateRequirementsData) => {
    const newRequirements = {
      ...requirements,
      [field]: !requirements[field],
    };
    setRequirements(newRequirements);
    onSubmit(newRequirements);
  };

  return (
    <Card className="p-6 bg-white space-y-6 rounded-xl card-shadow border-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Update Requirements
        </h2>
        <p className="text-sm text-muted-foreground">
          Set what participants need to include
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="photo-requirement">Require Photo</Label>
              <p className="text-sm text-muted-foreground">
                Require participants to include a photo with each update
              </p>
            </div>
            <Switch
              id="photo-requirement"
              checked={requirements.requirePhoto}
              onCheckedChange={() => handleToggle("requirePhoto")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comment-requirement">Comment Requirement</Label>
              <p className="text-sm text-muted-foreground">
                Require participants to include a text comment
              </p>
            </div>
            <Switch
              id="comment-requirement"
              checked={requirements.requireComment}
              onCheckedChange={() => handleToggle("requireComment")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="metric-requirement">Metric Requirement</Label>
              <p className="text-sm text-muted-foreground">
                Require participants to include progress metrics
              </p>
            </div>
            <Switch
              id="metric-requirement"
              checked={requirements.requireMetric}
              onCheckedChange={() => handleToggle("requireMetric")}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
