import { useAbsences } from '../hooks/useAbsences';

export default function Absences() {
  const { absences, isLoading, isError } = useAbsences();

 
  const formatStatus = (status) => {
    const statusMap = {
      en_attente: { label: 'En attente', class: 'badge badge-warning' },
      prete_pour_validation: { label: 'Prête pour validation', class: 'badge badge-info' },
      validee: { label: 'Validée', class: 'badge badge-success' },
      refusee: { label: 'Refusée', class: 'badge badge-error' },
    };
    return statusMap[status] || { label: status, class: 'badge badge-neutral' };
  };

  if (isLoading) return <div className="p-4 text-[#fe0503]">Chargement...</div>;
  if (isError) return <div className="p-4 text-red-500">Erreur lors du chargement des absences</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#fe0503] mb-4">Mes Absences</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-[#fe0503] text-white">
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Commentaires</th>
            </tr>
          </thead>
          <tbody>
            {absences?.map((absence) => {
              const { label, class: badgeClass } = formatStatus(absence.status);
              return (
                <tr key={absence._id}>
                  <td>{new Date(absence.dateFrom).toLocaleDateString()}</td>
                  <td>{new Date(absence.dateTo).toLocaleDateString()}</td>
                  <td>{absence.reason}</td>
                  <td>
                    <span className={badgeClass}>{label}</span>
                  </td>
                  <td>{absence.comments || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}