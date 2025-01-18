import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useInfoContext } from './context/InfoContext';
import { ToastContainer } from 'react-toastify';
import Category from './pages/Category/Category';
import Header from '../src/components/Header/Header';
import Account from './pages/Account/Account';
import Cars from './pages/Cars/Cars';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Brands from './pages/Brands/Brands';
import NotFound from './pages/NotFoud.jsx/NotFound';
import 'react-phone-input-2/lib/style.css'

function App() {

  const { currentUser } = useInfoContext()

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path='/' element={<Home />}/> */}
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/brand/:id' element={<Brands />}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/' element={<Category/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
