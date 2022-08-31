import './App.css';
import { BrowserRouter ,Route, Routes } from "react-router-dom"
import Header from './Component/Header'
import About from './Pages/About';
import Banner from './Component/Banner';
import Login from './Pages/Login';
import Register from './Pages/Register';
function App() {
  return (
    <> 
    <div>
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<><Header/><Banner/></>}/>
      <Route path ="/about" element={<><Header/><About /></>}/>
      <Route path ="/login" element={<><Header/><Login /></>}/>
      <Route path ="/register" element={<><Header/><Register /></>}/>
    </Routes>
    </BrowserRouter>
  </div>
    </>
  );
}

export default App;