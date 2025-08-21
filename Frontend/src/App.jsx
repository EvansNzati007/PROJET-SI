import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import SecretariatPage from './pages/SecretariatPage';
import EtudiantPage from './pages/EtudiantPage';
import ChefDepPage from './pages/ChefDepPage';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
	{path: '/', element: <LoginPage /> },
	{path: '/etu', element : <EtudiantPage /> },
	{path: '/sec', element : <SecretariatPage /> },
	{path: '/chef', element : <ChefDepPage /> },
	{path: '*', element : <PageNotFound /> }
]);

function App() {
	return <RouterProvider router={router} />
}

export default App
