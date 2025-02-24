import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Category from './pages/Category/Category';
import Header from '../src/components/Header/Header';
import Account from './pages/Account/Account';
import Cars from './pages/Cars/Cars';
import Auth from './pages/Auth/Auth';
import Brands from './pages/Brands/Brands';
import NotFound from './pages/NotFoud.jsx/NotFound';
import 'react-phone-input-2/lib/style.css'
import Footer from './components/Footer/Footer';
import 'boxicons/css/boxicons.min.css';

function App() {

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Category />} /> {/* Define the default route */}
          <Route path="/users" element={<Cars />} />
          <Route path="/auth" element={true ? <Auth /> : <Navigate to='/' replace/>} />
          <Route path="/brand/:id" element={<Brands />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched routes */}
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>

  );
}

export default App;
