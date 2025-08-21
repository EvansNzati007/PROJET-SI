import { useState, useContext } from 'react';
import { useAbsences } from '../hooks/useAbsences';
import AuthContext from '../contexts/AuthContext';
import api from '../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AbsencesAdmin() {
  const { absences, isLoading, isError, mutate } = useAbsences();
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState({});

  // Fonction pour formater le statut et associer une classe Tailwind
  const formatStatus = (status) => {
    const statusMap = {
      en_attente: { label: 'En attente', class: 'badge badge-warning' },
      prete_pour_validation: { label: 'Prête pour validation', class: 'badge badge-info' },
      validee: { label: 'Validée', class: 'badge badge-success' },
      refusee: { label: 'Refusée', class: 'badge badge-error' },
    };
    return statusMap[status] || { label: status, class: 'badge badge-neutral' };
  };

  const handleReview = async (absenceId, status) => {
    try {
      await api.put(
        `/absences/${absenceId}/review`,
        { status, comments: comments[absenceId] || '' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      mutate();
      toast.success(`Demande ${status === 'prete_pour_validation' ? 'prête pour validation' : 'refusée'}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la révision');
    }
  };

  const handleValidate = async (absenceId, status) => {
    try {
      await api.put(
        `/absences/${absenceId}/validate`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      mutate();
      toast.success(`Demande ${status}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la validation');
    }
  };

  const handleCommentChange = (absenceId, value) => {
    setComments({ ...comments, [absenceId]: value });
  };

  if (isLoading) return <div className="p-4 text-[#fe0503]">Chargement...</div>;
  if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement des absences</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#fe0503] mb-4">Gestion des Absences</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-[#fe0503] text-white">
              <th>Étudiant</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Motif</th>
              <th>Justificatif</th>
              <th>Statut</th>
              <th>Commentaires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {absences?.map((absence) => {
              const { label, class: badgeClass } = formatStatus(absence.status);
              return (
                <tr key={absence._id}>
                  <td>{absence.studentId?.username || 'Inconnu'}</td>
                  <td>{new Date(absence.dateFrom).toLocaleDateString()}</td>
                  <td>{new Date(absence.dateTo).toLocaleDateString()}</td>
                  <td>{absence.reason}</td>
                  <td>
                    {absence.justification ? (
                      <a
                        href={`${import.meta.env.VITE_API_URL}/${absence.justification}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#fe0503] underline"
                      >
                        Voir PDF
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <span className={badgeClass}>{label}</span>
                  </td>
                  <td>{absence.comments || '-'}</td>
                  <td>
                    {user.role === 'SECRETAIRE' && absence.status === 'en_attente' && (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Ajouter un commentaire"
                          value={comments[absence._id] || ''}
                          onChange={(e) => handleCommentChange(absence._id, e.target.value)}
                          className="input input-bordered w-full"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReview(absence._id, 'prete_pour_validation')}
                            className="btn btn-sm bg-[#fe0503] text-white hover:bg-white hover:text-[#fe0503] border-[#fe0503]"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() => handleReview(absence._id, 'refusee')}
                            className="btn btn-sm btn-error"
                          >
                            Refuser
                          </button>
                        </div>
                      </div>
                    )}
                    {user.role === 'CHEF_DE_DEPARTEMENT' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleValidate(absence._id, 'validee')}
                          className="btn btn-sm bg-[#fe0503] text-white hover:bg-white hover:text-[#fe0503] border-[#fe0503]"
                          disabled={absence.status !== 'prete_pour_validation'}
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => handleValidate(absence._id, 'refusee')}
                          className="btn btn-sm btn-error"
                          disabled={absence.status !== 'prete_pour_validation'}
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
