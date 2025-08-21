import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function NavigationAdmin() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-[#fe0503] text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="menu">
        <li>
          <NavLink to={user.role === 'SECRETAIRE' ? '/sec' : '/chef'} className="text-white hover:bg-white hover:text-[#fe0503]">
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink to={user.role === 'SECRETAIRE' ? '/sec/absences' : '/chef/absences'} className="text-white hover:bg-white hover:text-[#fe0503]">
            Absences
          </NavLink>
        </li>
        <li>
          <NavLink to={user.role === 'SECRETAIRE' ? '/sec/students' : '/chef/students'} className="text-white hover:bg-white hover:text-[#fe0503]">
            Étudiants
          </NavLink>
        </li>
        {user.role === 'CHEF_DE_DEPARTEMENT' && (
          <li>
            <NavLink to="/chef/create-user" className="text-white hover:bg-white hover:text-[#fe0503]">
              Créer un utilisateur
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to={user.role === 'SECRETAIRE' ? '/sec/messages' : '/chef/messages'} className="text-white hover:bg-white hover:text-[#fe0503]">
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink to={user.role === 'SECRETAIRE' ? '/sec/profile' : '/chef/profile'} className="text-white hover:bg-white hover:text-[#fe0503]">
            Profil
          </NavLink>
        </li>
      </ul>
    </div>
  );
}