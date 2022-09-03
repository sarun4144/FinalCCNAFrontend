import './App.css';
import { BrowserRouter ,Route, Routes } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//landdingpage
import Header from './Component/Header'
import About from './Pages/About';
import Banner from './Component/Banner';
import Login from './Pages/Login';
import Register from './Pages/Register';

//userpage
import Home from './Component/user/Home';

//adminpage
import Ahome from './Component/admin/Ahome';

function App() {
  return (
    <> 
    <div>
      <BrowserRouter>
      <ToastContainer/>
    <Routes>
      <Route exact path="/" element={<><Header/><Banner/></>}/>
      <Route path ="/about" element={<><Header/><About /></>}/>
      <Route path ="/login" element={<><Header/><Login /></>}/>
      <Route path ="/register" element={<><Header/><Register /></>}/>


     <Route path ="/user/home" element={<><Home /></>}/>

     <Route path ="/admin/home" element={<><Ahome /></>}/>
    </Routes>
    </BrowserRouter>
  </div>
    </>
  );
}

export default App;