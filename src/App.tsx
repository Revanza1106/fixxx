import './App.css'
import Navbar from './shared/components/Navbar'
import Home from './features/Home'
import Footer from './shared/components/Footer'
import About from './features/About'
import Contact from './features/Contact'
import Service from './features/Service'
import TrackAndTrace from './features/TrackAndTrace'
import BranchOffices from './features/BranchOffices'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<TrackAndTrace />} />
          <Route path="/branches" element={<BranchOffices />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
