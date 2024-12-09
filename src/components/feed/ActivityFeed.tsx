import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, PlusCircle, Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActivityPost {
  id: string;
  type: "update" | "nudge";
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  challenge: {
    id: string;
    title: string;
    progress?: number;
    target?: number;
    metric?: string;
  };
  content?: {
    text?: string;
    image?: string;
  };
  likes?: number;
  comments?: number;
  timestamp: string;
}

const mockPosts: ActivityPost[] = [
  {
    id: "3",
    type: "nudge",
    user: {
      name: "Alex Kim",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=AK",
      initials: "AK",
    },
    challenge: {
      id: "1",
      title: "Morning Run Challenge",
    },
    timestamp: "Just now",
  },
  {
    id: "1",
    type: "update",
    user: {
      name: "Sarah Chen",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=SC",
      initials: "SC",
    },
    challenge: {
      id: "1",
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
    type: "update",
    user: {
      name: "Mike Johnson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=MJ",
      initials: "MJ",
    },
    challenge: {
      id: "2",
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
  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  const handleUpdateClick = (challengeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/update?challenge=${challengeId}`);
  };

  const renderNudge = (post: ActivityPost) => (
    <Card
      key={post.id}
      className="p-4 space-y-4 hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-indigo-50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <Hand className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{post.user.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              nudged you about{" "}
              <span className="font-medium">{post.challenge.title}</span>
            </p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
      </div>
      <p className="text-sm text-primary-foreground/80 italic">
        "Don't fall behind! Your friends are making progress."
      </p>
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => handleUpdateClick(post.challenge.id, e)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Update
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => handleChallengeClick(post.challenge.id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Challenge
        </Button>
      </div>
    </Card>
  );

  const renderUpdate = (post: ActivityPost) => (
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
        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
      </div>

      {post.content?.text && <p className="text-sm">{post.content.text}</p>}

      {post.content?.image && (
        <img
          src={post.content.image}
          alt="Activity"
          className="rounded-lg w-full h-48 object-cover"
        />
      )}

      {post.challenge.progress && post.challenge.target && (
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
      )}

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
  );

  return (
    <div className="space-y-4 mb-20">
      {mockPosts.map((post) =>
        post.type === "nudge" ? renderNudge(post) : renderUpdate(post),
      )}
    </div>
  );
}
