import { useState, useContext } from 'react';
import api from '../config/axios';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateUserForm() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'ETUDIANT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post(
        '/users/admin/create',
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Utilisateur créé avec succès');
      setFormData({ username: '', email: '', password: '', role: 'ETUDIANT' });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la création';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center border-l-8 border-[#fe0503] py-4 px-3 mb-8">
          <h3 className="text-3xl font-bold text-[#fe0503]">Créer un utilisateur</h3>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-[#fe0503]"></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Nom d'utilisateur"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    placeholder="mail@site.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Adresse email"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Doit contenir plus de 8 caractères, incluant un chiffre, une lettre minuscule, une lettre majuscule"
                    aria-label="Mot de passe"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rôle
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <path d="M17 11l2 2 4-4"></path>
                    </g>
                  </svg>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="select select-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Rôle de l'utilisateur"
                  >
                    <option value="ETUDIANT">Étudiant</option>
                    <option value="SECRETAIRE">Secrétaire</option>
                    <option value="CHEF_DE_DEPARTEMENT">Chef de Département</option>
                  </select>
                </div>
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 col-span-1 md:col-span-2">{error}</p>}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#fe0503] text-white btn btn-md hover:bg-white hover:text-[#fe0503] border-[#fe0503] shadow-md transition-all duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : 'Créer l\'utilisateur'}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}