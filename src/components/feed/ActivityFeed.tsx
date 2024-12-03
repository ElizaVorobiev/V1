import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  challenge: {
    title: string;
    progress: number;
    target: number;
    metric: string;
  };
  content: {
    text?: string;
    image?: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: ActivityPost[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=SC",
      initials: "SC",
    },
    challenge: {
      title: "Morning Run Challenge",
      progress: 750,
      target: 900,
      metric: "steps",
    },
    content: {
      text: "Early morning run! 🏃‍♀️ Feeling energized and ready for the day!",
      image: "https://dummyimage.com/600x400/E8E4FF/6366f1&text=Morning+Run",
    },
    likes: 12,
    comments: 3,
    timestamp: "2h ago",
  },
  {
    id: "2",
    user: {
      name: "Mike Johnson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=MJ",
      initials: "MJ",
    },
    challenge: {
      title: "Strength Training",
      progress: 600,
      target: 800,
      metric: "calories",
    },
    content: {
      text: "Push day complete! 💪 New personal best on bench press.",
      image: "https://dummyimage.com/600x400/E4FFF4/10B981&text=Workout",
    },
    likes: 8,
    comments: 5,
    timestamp: "4h ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-4 mb-20">
      {mockPosts.map((post) => (
        <Card key={post.id} className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.challenge.title}
                </p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {post.timestamp}
            </span>
          </div>

          {post.content.text && <p className="text-sm">{post.content.text}</p>}

          {post.content.image && (
            <img
              src={post.content.image}
              alt="Activity"
              className="rounded-lg w-full h-48 object-cover"
            />
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {post.challenge.progress}/{post.challenge.target}{" "}
                {post.challenge.metric}
              </span>
            </div>
            <Progress
              value={(post.challenge.progress / post.challenge.target) * 100}
              className="h-2"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Heart className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
