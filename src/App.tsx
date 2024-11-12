import { Route, HashRouter as Router, Routes } from "react-router-dom";
import LoginPage from "@/pages/Login";
import DescPage from "@/pages/Desc";
import TestPage from "@/pages/Test";
import ResulPage from "@/pages/Result";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/desc" element={<DescPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResulPage />} />
      </Routes>
    </Router>
  );
};

export default App;
