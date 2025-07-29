// src/main.tsx (or index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom'; // <-- REMOVE this import if it exists
import App from './App';
import './index.css'; // Or your global CSS file

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* Ensure App is NOT wrapped in another <Router> here */}
        <App />
    </React.StrictMode>,
);