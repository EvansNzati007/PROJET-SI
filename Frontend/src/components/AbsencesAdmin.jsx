import { EyeIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function AbsencesAdmin() {
    const title = "Liste des demandes d'absence";

  return (
    <section>
      <div className="px-4 bg-base-100">
        <h2 className="font-semibold text-center text-lg my-3.5">
          { title }
        </h2>

        <div className="overflow-x-auto shadow-sm rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Classe</th>
                        <th>Début</th>
                        <th>Fin</th>
                        <th>Statut</th>
                        <th colSpan={3} className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>DOE</td>
                        <td>John</td>
                        <td>L3 IIRT</td>
                        <td>01/19/2025</td>
                        <td>04/19/2025</td>
                        <td>
                            <div className="badge badge-primary">En cours</div>
                        </td>
                        <td className='tooltip' data-tip="Consulter">
                            <button className="btn btn-square">
                                <EyeIcon className='size-5' />
                            </button> 
                        </td>
                        <td className='tooltip' data-tip="Accepter">
                            <button className="btn btn-square btn-success">
                                <CheckIcon className='size-5 text-white' />
                            </button> 
                        </td>
                        <td className='tooltip' data-tip="Rejeter">
                            <button className="btn btn-square btn-error">
                                <TrashIcon className='size-5 text-white' />
                            </button> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </section>
  )
}
