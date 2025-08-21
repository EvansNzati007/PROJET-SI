import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import image from '../assets/images/IMG_2243.jpeg';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
    document.title = `Tableau de bord - ${user?.username || 'Utilisateur'}`;
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar bg-base-100 shadow-sm rounded-md">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <p className="text-xl font-semibold text-[#fe0503]">
          Tableau de bord - {user?.username || 'Utilisateur'} ({user?.role || 'Rôle'})
        </p>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Avatar utilisateur" src={image} />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <p className="justify-between">
              {user?.username || 'Utilisateur'}
              <span className="badge badge-outline text-[#fe0503]">{user?.role || 'Rôle'}</span>
            </p>
          </li>
          <li>
            <Link to={user?.role === 'ETUDIANT' ? '/etu/profile' : user?.role === 'SECRETAIRE' ? '/sec/profile' : '/chef/profile'}>
              Profil
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Déconnexion</button>
          </li>
        </ul>
      </div>
    </header>
  );
}