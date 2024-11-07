import { Route, HashRouter as Router, Routes } from "react-router-dom";
import LoginPage from '@/pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
