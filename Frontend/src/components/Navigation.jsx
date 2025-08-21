import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/Certificate.png';
import AuthContext from '../contexts/AuthContext';

export default function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <section className="w-72 bg-base-100 shadow-sm rounded-md h-screen">
      <div className="flex flex-col items-center py-4">
        <img src={logo} alt="Logo certificat" className="w-40 bg-[#ffebeb] my-2.5 rounded-md" />
        <p className="text-center font-semibold">Ecole Supérieur de Gestion d'Informatique et des Sciences</p>
        <p className="text-[#fe0503] font-bold mt-2">
          {user?.username || 'Utilisateur'} ({user?.role || 'Étudiant'})
        </p>
      </div>
      <div className="border-t border-gray-300"></div>
      <nav className="flex justify-center pt-2.5">
        <ul className="menu gap-2 w-full [&_li>*]:rounded-none px-2.5">
          <li>
            <Link
              to="/etu"
              className="bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white hover:border-[#fe0503] hover:rounded-md hover:border-1"
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link
              to="/etu/profile"
              className="bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white hover:border-[#fe0503] hover:rounded-md hover:border-1"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              to="/etu/schedule"
              className="bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white hover:border-[#fe0503] hover:rounded-md hover:border-1"
            >
              Emploi du temps
            </Link>
          </li>
          <li>
            <Link
              to="/etu/absences"
              className="bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white hover:border-[#fe0503] hover:rounded-md hover:border-1"
            >
              Absences
            </Link>
          </li>
          <li>
            <Link
              to="/etu/messages"
              className="bg-[#fe0503] text-white font-semibold text-lg rounded-md border-1 hover:text-[#fe0503] hover:bg-white hover:border-[#fe0503] hover:rounded-md hover:border-1"
            >
              Messages
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}