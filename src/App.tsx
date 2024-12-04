import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import UpdateProgress from "./pages/UpdateProgress";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import ChallengeDetails from "./pages/ChallengeDetails";
import BottomNav from "./components/layout/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/update" element={<UpdateProgress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/challenge/:id" element={<ChallengeDetails />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
