import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaylistPage from './pages/Playlist/Playlist';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </>
  );
}

export default App;
