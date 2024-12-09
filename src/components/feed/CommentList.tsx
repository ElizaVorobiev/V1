import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  text: string;
  timestamp: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback>{comment.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {comment.timestamp}
                </span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
