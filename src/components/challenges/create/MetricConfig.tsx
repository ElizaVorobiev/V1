import React from "react";
import { useForm } from "react-hook-form";
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

interface MetricConfigProps {
  onSubmit?: (data: MetricConfigData) => void;
  initialData?: Partial<MetricConfigData>;
}

export interface MetricConfigData {
  metricType: string;
  metricTarget: string;
}

const defaultData: MetricConfigData = {
  metricType: "steps",
  metricTarget: "900",
};

export default function MetricConfig({
  onSubmit = () => {},
  initialData = defaultData,
}: MetricConfigProps) {
  const { register, handleSubmit } = useForm<MetricConfigData>({
    defaultValues: initialData,
  });

  const [metricType, setMetricType] = React.useState(
    initialData.metricType || "steps",
  );

  // Submit form data whenever any field changes
  const handleChange = () => {
    const formData = {
      metricType,
      metricTarget: register("metricTarget").value,
    };
    onSubmit(formData);
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

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Metric Type</Label>
            <Select
              value={metricType}
              onValueChange={(value) => {
                setMetricType(value);
                handleChange();
              }}
            >
              <SelectTrigger className="rounded-lg border-2 focus:border-primary">
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steps">Steps</SelectItem>
                <SelectItem value="calories">Calories</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metricTarget">Target Value</Label>
            <Input
              id="metricTarget"
              type="number"
              placeholder="Enter target value"
              {...register("metricTarget")}
              onChange={handleChange}
              className="w-full rounded-lg border-2 focus:border-primary"
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
