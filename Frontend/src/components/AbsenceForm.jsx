import { useState, useContext } from 'react';
import api from '../config/axios'; // Corrigé de ../config/axios
import AuthContext from '../contexts/AuthContext';
import { useAbsences } from '../hooks/useAbsences';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AbsenceForm() {
  const { user } = useContext(AuthContext);
  const { mutate } = useAbsences();
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    reason: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const data = new FormData();
    data.append('dateFrom', formData.dateFrom);
    data.append('dateTo', formData.dateTo);
    data.append('reason', formData.reason);
    if (file) data.append('justification', file); // Correspond au nom attendu par le backend

    try {
      await api.post('/absences', data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      mutate();
      toast.success('Demande soumise avec succès');
      setFormData({ dateFrom: '', dateTo: '', reason: '' });
      setFile(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la soumission';
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
          <h3 className="text-3xl font-bold text-[#fe0503]">Soumettre une demande d'absence</h3>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-[#fe0503]"></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="M2 10h20"></path>
                    </g>
                  </svg>
                  <input
                    type="date"
                    name="dateFrom"
                    value={formData.dateFrom}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Date de début"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="M2 10h20"></path>
                    </g>
                  </svg>
                  <input
                    type="date"
                    name="dateTo"
                    value={formData.dateTo}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Date de fin"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif
                <div className="input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M3 4h18v2H3z"></path>
                      <path d="M3 10h18v2H3z"></path>
                      <path d="M3 16h18v2H3z"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="reason"
                    placeholder="Motif de l'absence"
                    value={formData.reason}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    required
                    aria-label="Motif de l'absence"
                  />
                </div>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justificatif (PDF)
                <div className="file-input validator flex items-center gap-2 border-[#fe0503] rounded-md shadow-sm">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </g>
                  </svg>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full focus:ring-[#fe0503] focus:border-[#fe0503]"
                    aria-label="Justificatif PDF"
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
                {loading ? <span className="loading loading-spinner"></span> : 'Soumettre'}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}