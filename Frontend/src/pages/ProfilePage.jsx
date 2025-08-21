import { useState, useContext, useEffect } from 'react';
import api from '../config/axios'; // Corrigé de ../config/axios
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.token) {
        toast.error('Utilisateur non authentifié');
        return;
      }
      setLoading(true);
      try {
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: '',
        });
      } catch (err) {
        toast.error(err.response?.data?.message || 'Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchUser();
  }, [user?.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.put(
        '/users/update',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      login(response.data.user.token || user.token, response.data.user.role, response.data.user.id);
      toast.success('Profil mis à jour avec succès');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la mise à jour';
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
          <h3 className="text-3xl font-bold text-[#fe0503]">Mettre à jour le profil</h3>
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
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe (facultatif)
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
                    placeholder="Nouveau mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Doit contenir plus de 8 caractères, incluant un chiffre, une lettre minuscule, une lettre majuscule"
                    aria-label="Nouveau mot de passe"
                  />
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
                {loading ? <span className="loading loading-spinner"></span> : 'Mettre à jour'}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
