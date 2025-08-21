import { useState, useEffect, useContext } from 'react';
import api from '../config/axios';
import AuthContext from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentsList() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/absences/students', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Students response:', response.data); // Log pour débogage
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des étudiants');
        toast.error(err.response?.data?.message || 'Erreur lors du chargement des étudiants');
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.token) fetchStudents();
  }, [user?.token]);

  if (isLoading) return <div className="p-4 text-[#fe0503]">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#fe0503] mb-4">Liste des Étudiants</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-[#fe0503] text-white">
              <th>Nom d'utilisateur</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.username}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}