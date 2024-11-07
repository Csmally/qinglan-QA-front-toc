import { Route, HashRouter as Router, Routes } from "react-router-dom";
import LoginPage from "@/pages/Login";
import DescPage from "@/pages/Desc";
import TestPage from "@/pages/Test";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/desc" element={<DescPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

export default App;
