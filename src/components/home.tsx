import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChallengeBasicInfo from "./challenges/create/ChallengeBasicInfo";
import MetricConfig from "./challenges/create/MetricConfig";
import UpdateRequirements from "./challenges/create/UpdateRequirements";
import ChallengePreview from "./challenges/create/ChallengePreview";
import ShareOptions from "./challenges/create/ShareOptions";

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

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const [formData, setFormData] = React.useState<ChallengeFormData>({
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
    <div className="w-screen h-screen bg-background p-4">
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 lime-button rounded-full px-6 py-3 shadow-lg"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Challenge
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
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
