import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  MessageCircle,
  PlusCircle,
  Eye,
  Hand,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommentList, { Comment } from "./CommentList";
import CommentInput from "./CommentInput";

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
    hasUpdatedToday?: boolean;
    todaysUpdate?: ActivityPost;
  };
  content?: {
    text?: string;
    image?: string;
  };
  likes?: number;
  isLiked?: boolean;
  comments?: Comment[];
  showComments?: boolean;
  timestamp: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Emma Wilson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=EW",
      initials: "EW",
    },
    text: "Great progress! Keep it up! 💪",
    timestamp: "1h ago",
  },
  {
    id: "2",
    user: {
      name: "David Lee",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=DL",
      initials: "DL",
    },
    text: "You're crushing it! 🔥",
    timestamp: "30m ago",
  },
];

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
      hasUpdatedToday: true,
      todaysUpdate: {
        id: "1",
        type: "update",
        user: {
          name: "You",
          avatar: "https://dummyimage.com/100/6366f1/ffffff&text=YOU",
          initials: "YOU",
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
          image:
            "https://dummyimage.com/600x400/E8E4FF/6366f1&text=Morning+Run",
        },
        likes: 12,
        isLiked: false,
        comments: mockComments,
        showComments: false,
        timestamp: "2h ago",
      },
    },
    timestamp: "Just now",
  },
  {
    id: "4",
    type: "nudge",
    user: {
      name: "Emma Wilson",
      avatar: "https://dummyimage.com/100/6366f1/ffffff&text=EW",
      initials: "EW",
    },
    challenge: {
      id: "2",
      title: "Strength Training",
      hasUpdatedToday: false,
    },
    timestamp: "5m ago",
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
    isLiked: false,
    comments: mockComments,
    showComments: false,
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
    isLiked: false,
    comments: [],
    showComments: false,
    timestamp: "4h ago",
  },
];

export default function ActivityFeed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ActivityPost[]>(mockPosts);
  const [expandedNudge, setExpandedNudge] = useState<string | null>(null);

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  const handleUpdateClick = (challengeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/update?challenge=${challengeId}`);
  };

  const handleLike = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId && post.type === "update") {
          const newLikeCount = post.isLiked
            ? (post.likes || 1) - 1
            : (post.likes || 0) + 1;
          return {
            ...post,
            likes: newLikeCount,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  const toggleComments = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showComments: !post.showComments };
        }
        return post;
      }),
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            user: {
              name: "You",
              avatar: "https://dummyimage.com/100/6366f1/ffffff&text=YOU",
              initials: "YOU",
            },
            text,
            timestamp: "Just now",
          };
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
          };
        }
        return post;
      }),
    );
  };

  const toggleNudgeExpansion = (postId: string) => {
    setExpandedNudge(expandedNudge === postId ? null : postId);
  };

  const renderNudge = (post: ActivityPost) => (
    <div key={post.id} className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="flex items-start justify-between mb-4">
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
          <span className="text-sm text-muted-foreground">
            {post.timestamp}
          </span>
        </div>
        <div className="flex gap-2">
          {post.challenge.hasUpdatedToday ? (
            <Badge
              variant="secondary"
              className="w-full justify-center py-2 cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleNudgeExpansion(post.id)}
            >
              <Check className="h-4 w-4 mr-2" />
              Updated Today
            </Badge>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => handleUpdateClick(post.challenge.id, e)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Update
            </Button>
          )}
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
      {expandedNudge === post.id && post.challenge.todaysUpdate && (
        <Card className="p-4 space-y-4 ml-8 border-l-4 border-l-primary">
          {renderUpdate(post.challenge.todaysUpdate)}
        </Card>
      )}
    </div>
  );

  const renderUpdate = (post: ActivityPost) => (
    <div className="space-y-4">
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
        <Button
          variant="ghost"
          size="sm"
          className={`text-muted-foreground ${post.isLiked ? "text-primary hover:text-primary" : ""}`}
          onClick={() => handleLike(post.id)}
        >
          <Heart
            className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`}
          />
          {post.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`text-muted-foreground ${post.showComments ? "text-primary hover:text-primary" : ""}`}
          onClick={() => toggleComments(post.id)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments?.length || 0}
        </Button>
      </div>

      {post.showComments && (
        <div className="space-y-4 pt-2 border-t">
          {post.comments && post.comments.length > 0 && (
            <CommentList comments={post.comments} />
          )}
          <CommentInput onSubmit={(text) => handleAddComment(post.id, text)} />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 mb-20">
      {posts.map((post) =>
        post.type === "nudge" ? (
          renderNudge(post)
        ) : (
          <Card key={post.id} className="p-4">
            {renderUpdate(post)}
          </Card>
        ),
      )}
    </div>
  );
}
