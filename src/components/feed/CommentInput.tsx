import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (comment.trim()) {
        onSubmit(comment);
        setComment("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a comment..."
        className="min-h-[2.5rem] max-h-32 rounded-lg border-2 focus:border-primary"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!comment.trim()}
        className="shrink-0 rounded-lg lime-button"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
