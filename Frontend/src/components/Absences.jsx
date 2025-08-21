
export default function Absences() {
  return (
    <section className="flex flex-row h-full relative bg-base-300 gap-4">
        <DemandeAbsence />
        <HistoriqueAbsence />
    </section>
  )
}

const HistoriqueAbsence = () => {
    return (
        <div className="w-1/2 px-4 bg-base-100">
            <h2 className="font-semibold text-center text-lg my-3.5">Historique des demandes d'absence</h2>
            <div className="overflow-x-auto shadow-sm rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Type</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>01/19/2025</td>
                            <td>04/19/2025</td>
                            <td>Maladie</td>
                            <td><div className="badge badge-primary">En cours</div></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>01/19/2025</td>
                            <td>04/19/2025</td>
                            <td>Maladie</td>
                            <td><div className="badge badge-error">Refusé</div></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>01/19/2025</td>
                            <td>04/19/2025</td>
                            <td>Maladie</td>
                            <td><div className="badge badge-success">Accepté</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const DemandeAbsence = () => {
    return (
        <div className="w-1/2 px-4 bg-base-100 overflow-y-auto">
            <h2 className="font-semibold text-center text-lg my-3.5">Rédiger une demande d'absence</h2>
            <form action="" >
                <div className="my-4">
                    <p>Période d'absence :</p>
                    <div className="flex gap-4">
                        <p className="flex flex-col flex-1 my-2 gap-1">
                            <label htmlFor="" className="text-sm font-semibold">Date de Début</label>
                            <input type="date" className="input" />
                        </p>
                        <p className="flex flex-col flex-1  my-2 gap-1">
                            <label htmlFor="" className="text-sm font-semibold">Date de Fin</label>
                            <input type="date" className="input" />
                        </p>
                    </div>
                </div>
                <div className="my-4">
                    <p>En raison de :</p>
                    <textarea className="textarea h-24 w-full" placeholder="Motif"></textarea>
                </div>
                <div className="my-4">
                    <p>Nom(s) du/des modules(s) manqué(s):</p>
                    <textarea className="textarea h-24 w-full" placeholder="Module"></textarea>
                </div>
                <div className="my-4">
                    <p>Nom de l'examen manqué (Intra et/ou Finale à préciser) :</p>
                    <textarea className="textarea h-24 w-full" placeholder="Module"></textarea>
                </div>
                <div className="my-4">
                    <p>Justificatif(s) :</p>
                    <label htmlFor="">Type d'absence : </label>
                    <select defaultValue="Sélectionner" className="select">
                        <option disabled={true}>Sélectionner</option>
                        <option>Maladie</option>
                        <option>Voyage</option>
                        <option>Autre</option>
                    </select>
                    <p>Joindre des pièces : </p>
                    <input type="file" className="file-input w-full my-2" />
                    <input type="file" className="file-input w-full my-2" />
                    <input type="file" className="file-input w-full my-2" />
                </div>
                <div className="flex justify-center my-2">
                    <button className="btn btn-primary">Envoyer</button>
                </div>
            </form>
        </div>
    )
}