import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface MetricConfigProps {
  onSubmit?: (data: MetricConfigData) => void;
  initialData?: Partial<MetricConfigData>;
}

export interface MetricConfigData {
  metrics: Array<{
    type: string;
    target: string;
    name?: string;
  }>;
}

const defaultData: MetricConfigData = {
  metrics: [
    {
      type: "steps",
      target: "900",
    },
  ],
};

const metricOptions = [
  { value: "steps", label: "Steps" },
  { value: "calories", label: "Calories" },
  { value: "distance", label: "Distance (km)" },
  { value: "duration", label: "Duration (mins)" },
  { value: "reps", label: "Repetitions" },
  { value: "weight", label: "Weight (kg)" },
  { value: "custom", label: "Custom" },
];

export default function MetricConfig({
  onSubmit = () => {},
  initialData = defaultData,
}: MetricConfigProps) {
  const [formState, setFormState] = React.useState<MetricConfigData>({
    metrics: initialData?.metrics || defaultData.metrics,
  });

  const { control } = useForm<MetricConfigData>({
    defaultValues: formState,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "metrics",
  });

  // Handle metric type change
  const handleMetricTypeChange = (value: string, index: number) => {
    const newMetrics = [...formState.metrics];
    newMetrics[index] = {
      ...newMetrics[index],
      type: value,
      // Reset target when switching to/from custom
      target: value === "custom" ? "" : "0",
    };
    const newState = { metrics: newMetrics };
    setFormState(newState);
    onSubmit(newState);
  };

  // Handle target value change
  const handleTargetChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMetrics = [...formState.metrics];
    newMetrics[index] = {
      ...newMetrics[index],
      target: e.target.value,
    };
    const newState = { metrics: newMetrics };
    setFormState(newState);
    onSubmit(newState);
  };

  // Handle custom metric name change
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMetrics = [...formState.metrics];
    newMetrics[index] = {
      ...newMetrics[index],
      name: e.target.value,
    };
    const newState = { metrics: newMetrics };
    setFormState(newState);
    onSubmit(newState);
  };

  // Handle add metric
  const handleAddMetric = () => {
    const newMetric = { type: "steps", target: "0" };
    const newMetrics = [...formState.metrics, newMetric];
    const newState = { metrics: newMetrics };
    setFormState(newState);
    append(newMetric);
    onSubmit(newState);
  };

  // Handle remove metric
  const handleRemoveMetric = (index: number) => {
    const newMetrics = [...formState.metrics];
    newMetrics.splice(index, 1);
    const newState = { metrics: newMetrics };
    setFormState(newState);
    remove(index);
    onSubmit(newState);
  };

  return (
    <Card className="p-6 bg-white space-y-6 rounded-xl card-shadow border-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Metric Configuration
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose how to measure progress
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 items-start p-4 rounded-lg border bg-card"
          >
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Metric Type</Label>
                  <Select
                    defaultValue={formState.metrics[index]?.type}
                    onValueChange={(value) =>
                      handleMetricTypeChange(value, index)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {metricOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formState.metrics[index]?.type === "custom" ? (
                  <div className="space-y-2">
                    <Label>Metric Name</Label>
                    <Input
                      placeholder="Enter custom metric name"
                      value={formState.metrics[index]?.name || ""}
                      onChange={(e) => handleNameChange(e, index)}
                      className="rounded-lg border-2 focus:border-primary"
                    />
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>Daily Target Value</Label>
                <Input
                  type={
                    formState.metrics[index]?.type === "custom"
                      ? "text"
                      : "number"
                  }
                  placeholder={
                    formState.metrics[index]?.type === "custom"
                      ? "e.g., '3 sets of 10 reps'"
                      : "Enter target value"
                  }
                  value={formState.metrics[index]?.target || ""}
                  onChange={(e) => handleTargetChange(e, index)}
                  className="rounded-lg border-2 focus:border-primary"
                />
              </div>
            </div>

            {fields.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMetric(index)}
                className="rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddMetric}
          className="w-full rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Metric
        </Button>
      </div>
    </Card>
  );
}
