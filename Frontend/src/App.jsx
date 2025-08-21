import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SecretariatPage from './pages/SecretariatPage';
import EtudiantPage from './pages/EtudiantPage';
import ChefDepPage from './pages/ChefDepPage';
import PageNotFound from './pages/PageNotFound';
import AuthContext, { AuthProvider } from './contexts/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user.token || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/etu/*',
    element: (
      <ProtectedRoute allowedRoles={['ETUDIANT']}>
        <EtudiantPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/sec/*',
    element: (
      <ProtectedRoute allowedRoles={['SECRETAIRE']}>
        <SecretariatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chef/*',
    element: (
      <ProtectedRoute allowedRoles={['CHEF_DE_DEPARTEMENT']}>
        <ChefDepPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <PageNotFound /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
