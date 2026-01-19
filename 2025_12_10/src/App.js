import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/">Start</NavLink></li>
                        <li><NavLink to="/about">O nas</NavLink></li>
                        <li><NavLink to="/contact">Kontakt</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;