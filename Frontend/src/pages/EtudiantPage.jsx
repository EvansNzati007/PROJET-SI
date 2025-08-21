import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import AbsenceForm from '../components/AbsenceForm';
import Absences from '../components/Absences';
import ProfilePage from '../pages/ProfilePage';

export default function EtudiantPage() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<><h1 className="text-2xl font-bold text-[#fe0503] mb-4">Tableau de bord Étudiant</h1><AbsenceForm /><Absences /></>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/absences" element={<Absences />} />
            <Route path="/schedule" element={<h1 className="text-2xl font-bold text-[#fe0503] mb-4">Emploi du temps</h1>} />
            <Route path="/messages" element={<h1 className="text-2xl font-bold text-[#fe0503] mb-4">Messages</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}