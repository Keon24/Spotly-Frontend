import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
