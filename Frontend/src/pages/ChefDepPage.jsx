import { Routes, Route } from 'react-router-dom';
import NavigationAdmin from '../components/NavigationAdmin';
import Header from '../components/Header';
import AbsencesAdmin from '../components/AbsencesAdmin';
import ProfilePage from '../pages/ProfilePage';
import StudentsList from '../components/StudentList';
import CreateUserForm from '../components/CreateUserForm';

export default function ChefDepPage() {
  return (
    <div className="flex min-h-screen">
      <NavigationAdmin />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<><h1 className="text-2xl font-bold text-[#fe0503] mb-4">Tableau de bord Chef de Département</h1><AbsencesAdmin /></>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/create-user" element={<CreateUserForm />} />
            <Route path="/absences" element={<AbsencesAdmin />} />
            <Route path="/messages" element={<h1 className="text-2xl font-bold text-[#fe0503] mb-4">Messages</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}