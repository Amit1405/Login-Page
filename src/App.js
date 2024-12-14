import './App.css';
import Home from './Home';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Login';
import {AuthProvider, useAuth} from './utills/AuthContext';

function App() {
  const PrivateRoute=({children}) => {
    const { isLoggedIn } = useAuth();
    const isAuthenticated=isLoggedIn
    return isAuthenticated? children:<Navigate to="/auth/login" />;
  };
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;