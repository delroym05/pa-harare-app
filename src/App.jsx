import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './src/components/Navbar.jsx';
import { BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import Home from './src/components/pages/Home.jsx';
import WaveMenu from './src/components/Menu.jsx'
import Services from './src/components/pages/Services.jsx';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path ='/services' element={<Services/>}/>
      </Routes>
    </Router>
  )
}

export default App;
