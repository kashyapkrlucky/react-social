import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './Styles/index.css';

const root = createRoot(document.getElementById('root'));

root.render(
    <div className="container-fluid">
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </div>
);

