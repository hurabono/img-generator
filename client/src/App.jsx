import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#1B1B1D] sm:px-8 py-4 absolute">
        <Link to="/">
          <img src={logo} alt="logo" 
          className="w-[10rem] objact-contain py-2 px-4" />
        </Link>

        <Link to="/create-post"
          className="font-inter font-medium bg-transparent border text-white px-4 py-2 rounded-md mr-[1rem] sm:mr-0">
            Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#1B1B1D] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/create-post" element={< CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
    
  )
}

export default App
