import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/Certificate.png';
import image from '../assets/images/IMG_2243.jpeg';
import api from '../config/axios';
import AuthContext from '../contexts/AuthContext';

export default function LoginPage() {
  document.title = 'Se connecter';
  const [isLogin, setIsLogin] = useState(true); // Basculer entre login/register
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Connexion
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
	
        const { accessToken, user } = response.data;
	
        login(accessToken, user.role, user.id, user.username);
        if (user.role === 'ETUDIANT') navigate('/etu');
        else if (user.role === 'SECRETAIRE') navigate('/sec');
        else if (user.role === 'CHEF_DE_DEPARTEMENT') navigate('/chef');
      } else {
        // Inscription
        const response = await api.post('/users/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'ETUDIANT', // Par défaut, inscription pour étudiants
        });
        const { user } = response.data;
        setIsLogin(true); // Revenir au formulaire de connexion après inscription
        setError('Inscription réussie, veuillez vous connecter.');
        setFormData({ email: '', password: '', username: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la requête');
    }
  };

  return (
    <section className="flex flex-col relative px-4 h-screen">
      <header className="flex justify-between">
        <div className="flex py-4">
          <p className="text-[#fe0503] text-3xl">ESGIS</p>
          <img src={logo} alt="Logo certificat" className="w-[40px]" />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[#fe0503] font-bold">
            {isLogin ? 'Avez-vous un compte ?' : 'Déjà un compte ?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="bg-[#fe0503] btn btn-md text-white text-lg hover:bg-white hover:text-[#fe0503] border-[#fe0503]"
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </div>
      </header>
      <div className="flex justify-between h-[88%]">
        <div className="w-1/2 bg-black text-red-200">
          <img src={image} alt="Deux étudiants en face d'un ordinateur" className="h-full object-cover" />
        </div>

        {/* Formulaire */}
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex border-2 border-l-8 border-[#fe0503] py-5 px-2 mt-20 mb-15">
            <h3 className="text-4xl font-bold">
              {isLogin ? 'Connectez-vous à votre compte' : "Créez votre compte"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-lg">
            {!isLogin && (
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
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
                  required
                />
              </label>
            )}
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
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
                required
              />
            </label>
            <div className="validator-hint hidden">Enter valid email address</div>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
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
                required
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#fe0503] text-white btn btn-md hover:bg-white hover:text-[#fe0503] border-[#fe0503]"
              >
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}