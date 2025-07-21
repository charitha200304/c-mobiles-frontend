import './MainContent.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/home/home';

export function MainContent() {
  return (
    <main className="flex-1 pt-16">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes here as needed */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </main>
  );
}