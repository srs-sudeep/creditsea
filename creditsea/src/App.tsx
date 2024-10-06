import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import VerifierLayout from './layout/VerifierLayout';
import PrivateRoute from './core/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/userPages/userDashboard';
import VerifierPage from './pages/verifierPages/verifier';
import AdminPage from './pages/adminPages/adminDashboard';
import CreateVerifier from './pages/adminPages/createVerifier';
import ViewVerifiers from './pages/adminPages/viewVerifier';
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
            <Route path="/user" element={<PrivateRoute>
              <UserLayout />
            </PrivateRoute>}>
              <Route index element={<Navigate to="/user/dashboard" />} />
              <Route path='dashboard' element={<UserPage />} />
            </Route>
            <Route path="/verifier" element={<PrivateRoute>
              <VerifierLayout />
            </PrivateRoute>}>
              <Route index element={<Navigate to="/verifier/dashboard" />} />
              <Route path='dashboard' element={<VerifierPage />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute>
              <AdminLayout />
            </PrivateRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path='dashboard' element={<AdminPage />} />
              <Route path='createVerifier' element={<CreateVerifier />} />
              <Route path='viewVerifier' element={<ViewVerifiers />} />
            </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
