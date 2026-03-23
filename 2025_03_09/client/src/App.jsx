import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

export default App;
