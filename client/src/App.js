
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Startpage from './Startpage';
import Mappage from './Mappage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Startpage/>}/>
      <Route path="/mappage" element={<Mappage/>}/>
    </Routes>
  </Router>
  );
}

export default App;
