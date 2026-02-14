import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;