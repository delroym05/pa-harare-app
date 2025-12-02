import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './src/components/Navbar.jsx';
import { HashRouter as Router , Route,Routes } from 'react-router-dom';
import Home from './src/components/pages/Home.jsx';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
