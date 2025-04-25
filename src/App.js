import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Category from './pages/Category/Category';
import Header from '../src/components/Header/Header';
import Account from './pages/Account/Account';
import Users from './pages/Users/Users';
import Brands from './pages/Brands/Brands';
import NotFound from './pages/NotFoud.jsx/NotFound';
import 'react-phone-input-2/lib/style.css'
import Footer from './components/Footer/Footer';
import 'boxicons/css/boxicons.min.css';
import { useInfoContext } from './context/InfoContext';

function App() {
  const {currentUser} = useInfoContext

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Category />} /> {/* Define the default route */}
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:id" element={<Account />} />
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
