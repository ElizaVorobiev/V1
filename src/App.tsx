import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import UpdateProgress from "./pages/UpdateProgress";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import BottomNav from "./components/layout/BottomNav";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/update" element={<UpdateProgress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
        <BottomNav />
      </div>
    </Suspense>
  );
}

export default App;
