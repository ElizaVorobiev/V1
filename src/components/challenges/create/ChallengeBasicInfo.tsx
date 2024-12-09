import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

interface ChallengeBasicInfoProps {
  onSubmit?: (data: ChallengeBasicInfoData) => void;
  initialData?: Partial<ChallengeBasicInfoData>;
}

export interface ChallengeBasicInfoData {
  title: string;
  description: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

const defaultData: ChallengeBasicInfoData = {
  title: "",
  description: "",
  dateRange: {
    from: new Date(),
    to: addDays(new Date(), 30),
  },
};

export default function ChallengeBasicInfo({
  onSubmit = () => {},
  initialData = defaultData,
}: ChallengeBasicInfoProps) {
  const { register, getValues } = useForm<ChallengeBasicInfoData>({
    defaultValues: initialData,
  });

  const [date, setDate] = React.useState({
    from: initialData.dateRange?.from || new Date(),
    to: initialData.dateRange?.to || addDays(new Date(), 30),
  });

  // Submit form data whenever any field changes
  const handleChange = () => {
    const formData = {
      title: getValues("title"),
      description: getValues("description"),
      dateRange: date,
    };
    onSubmit(formData);
  };

  // Handle date range changes
  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    setDate(newDate);
    const formData = {
      title: getValues("title"),
      description: getValues("description"),
      dateRange: newDate,
    };
    onSubmit(formData);
  };

  return (
    <Card className="p-6 bg-white space-y-6 rounded-xl card-shadow border-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Basic Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Set up the core details of your challenge
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Challenge Title</Label>
          <Input
            id="title"
            placeholder="Enter challenge title"
            {...register("title")}
            onChange={handleChange}
            className="w-full rounded-lg border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your challenge"
            {...register("description")}
            onChange={handleChange}
            className="min-h-[100px] w-full rounded-lg border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label>Challenge Duration</Label>
          <DatePickerWithRange date={date} onSelect={handleDateChange} />
        </div>
      </form>
    </Card>
  );
}
