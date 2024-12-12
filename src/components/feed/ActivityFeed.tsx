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
  Pencil,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentList, { Comment } from "./CommentList";
import CommentInput from "./CommentInput";
import { useSocket } from "@/lib/socket";
import { useToast } from "@/components/ui/use-toast";
import EditUpdateDialog from "./EditUpdateDialog";

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

interface GroupedNudge {
  challengeId: string;
  challengeTitle: string;
  hasUpdatedToday: boolean;
  todaysUpdate?: ActivityPost;
  users: Array<{
    name: string;
    avatar: string;
    initials: string;
  }>;
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
    timestamp: "5m ago",
  },
  {
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
  const socket = useSocket();
  const { toast } = useToast();
  const [posts, setPosts] = useState<ActivityPost[]>(mockPosts);
  const [expandedNudge, setExpandedNudge] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<ActivityPost | null>(null);

  // Group nudges by challenge
  const groupedPosts = posts.reduce<(ActivityPost | GroupedNudge)[]>(
    (acc, post) => {
      if (post.type === "update") {
        acc.push(post);
        return acc;
      }

      // Find existing grouped nudge for this challenge
      const existingGroupIndex = acc.findIndex(
        (p) => "challengeId" in p && p.challengeId === post.challenge.id,
      );

      if (existingGroupIndex === -1) {
        // Create new grouped nudge
        acc.push({
          challengeId: post.challenge.id,
          challengeTitle: post.challenge.title,
          hasUpdatedToday: post.challenge.hasUpdatedToday || false,
          todaysUpdate: post.challenge.todaysUpdate,
          users: [post.user],
          timestamp: post.timestamp,
        });
      } else {
        // Add user to existing group
        const group = acc[existingGroupIndex] as GroupedNudge;
        if (!group.users.find((u) => u.name === post.user.name)) {
          group.users.push(post.user);
        }
        // Update timestamp if more recent
        if (post.timestamp === "Just now" || post.timestamp === "5m ago") {
          group.timestamp = post.timestamp;
        }
      }

      return acc;
    },
    [],
  );

  useEffect(() => {
    // Listen for new posts
    socket.on("new_post", (newPost: ActivityPost) => {
      setPosts((currentPosts) => [newPost, ...currentPosts]);
      toast({
        title: "New Update",
        description: `${newPost.user.name} posted a new update`,
      });
    });

    // Listen for new likes
    socket.on(
      "post_liked",
      ({
        postId,
        likes,
        likedBy,
      }: {
        postId: string;
        likes: number;
        likedBy: string;
      }) => {
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes,
                  isLiked: likedBy === "You" ? true : post.isLiked,
                }
              : post,
          ),
        );
      },
    );

    // Listen for new comments
    socket.on(
      "new_comment",
      ({ postId, comment }: { postId: string; comment: Comment }) => {
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...(post.comments || []), comment] }
              : post,
          ),
        );

        if (comment.user.name !== "You") {
          toast({
            title: "New Comment",
            description: `${comment.user.name} commented on a post`,
          });
        }
      },
    );

    // Listen for new nudges
    socket.on("new_nudge", (nudge: ActivityPost) => {
      setPosts((currentPosts) => [nudge, ...currentPosts]);
      toast({
        title: "New Nudge",
        description: `${nudge.user.name} nudged you about ${nudge.challenge.title}`,
      });
    });

    // Listen for post updates
    socket.on(
      "post_updated",
      ({ postId, update }: { postId: string; update: ActivityPost }) => {
        setPosts((currentPosts) =>
          currentPosts.map((post) => (post.id === postId ? update : post)),
        );
      },
    );

    return () => {
      socket.off("new_post");
      socket.off("post_liked");
      socket.off("new_comment");
      socket.off("new_nudge");
      socket.off("post_updated");
    };
  }, [socket, toast]);

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  const handleUpdateClick = (challengeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/update?challenge=${challengeId}`);
  };

  const handleLike = (postId: string) => {
    socket.emit("like_post", { postId });
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

    socket.emit("add_comment", { postId, comment: newComment });
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
          };
        }
        return post;
      }),
    );
  };

  const handleEditUpdate = (post: ActivityPost) => {
    setEditingPost(post);
  };

  const handleSaveEdit = (data: {
    text: string;
    progress: number;
    image: string;
  }) => {
    if (!editingPost) return;

    const updatedPost: ActivityPost = {
      ...editingPost,
      content: {
        text: data.text,
        image: data.image,
      },
      challenge: {
        ...editingPost.challenge,
        progress: data.progress,
      },
    };

    socket.emit("update_post", { postId: editingPost.id, update: updatedPost });
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === editingPost.id ? updatedPost : post,
      ),
    );
    setEditingPost(null);

    toast({
      title: "Update Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const toggleNudgeExpansion = (challengeId: string) => {
    setExpandedNudge(expandedNudge === challengeId ? null : challengeId);
  };

  const renderGroupedNudge = (group: GroupedNudge) => (
    <div key={group.challengeId} className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex -space-x-2">
              {group.users.slice(0, 3).map((user, index) => (
                <Avatar
                  key={user.name}
                  className="border-2 border-background ring-0"
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
              ))}
              {group.users.length > 3 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                  <Users className="h-4 w-4" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Hand className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {group.users.length > 1
                    ? `${group.users.length} people nudged you`
                    : `${group.users[0].name} nudged you`}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                about{" "}
                <span className="font-medium">{group.challengeTitle}</span>
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {group.timestamp}
          </span>
        </div>
        <div className="flex gap-2">
          {group.hasUpdatedToday ? (
            <Badge
              variant="secondary"
              className="w-full justify-center py-2 cursor-pointer hover:bg-muted/80 bg-muted text-muted-foreground"
              onClick={() => toggleNudgeExpansion(group.challengeId)}
            >
              <Check className="h-4 w-4 mr-2" />
              Updated Today
            </Badge>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="w-full lime-button"
              onClick={(e) => handleUpdateClick(group.challengeId, e)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Update
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleChallengeClick(group.challengeId)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Challenge
          </Button>
        </div>
      </Card>
      {expandedNudge === group.challengeId && group.todaysUpdate && (
        <Card className="p-4 space-y-4 ml-8 border-l-4 border-l-primary">
          {renderUpdate(group.todaysUpdate)}
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
        <div className="flex items-center gap-2">
          {post.user.name === "You" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted"
              onClick={() => handleEditUpdate(post)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {post.timestamp}
          </span>
        </div>
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
      {groupedPosts.map((post) =>
        "type" in post ? (
          <Card key={post.id} className="p-4">
            {renderUpdate(post)}
          </Card>
        ) : (
          renderGroupedNudge(post)
        ),
      )}
      {editingPost && (
        <EditUpdateDialog
          open={true}
          onOpenChange={() => setEditingPost(null)}
          update={editingPost}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
