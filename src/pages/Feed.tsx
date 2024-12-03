import ActivityFeed from "@/components/feed/ActivityFeed";

export default function Feed() {
  return (
    <div className="container max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Activity Feed</h1>
      <ActivityFeed />
    </div>
  );
}
