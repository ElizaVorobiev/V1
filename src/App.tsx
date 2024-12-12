import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import UpdateProgress from "./pages/UpdateProgress";
import JoinChallenge from "./pages/JoinChallenge";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import ChallengeDetails from "./pages/ChallengeDetails";
import BottomNav from "./components/layout/BottomNav";
import { Toaster } from "./components/ui/toaster";
import { SocketProvider } from "./lib/socketProvider";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/update" element={<UpdateProgress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/join" element={<JoinChallenge />} />
            <Route path="/challenge/:id" element={<ChallengeDetails />} />
          </Routes>
          <BottomNav />
          <Toaster />
        </div>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
