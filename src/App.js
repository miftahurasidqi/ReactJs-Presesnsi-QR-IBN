import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";

import DaftarKehadiran from "./pages/daftarKehadiran";
import KodeAbsen from "./pages/kodeAbsen";
import DaftarUser from "./pages/daftarUser";
import EditUser from "./pages/editUser";
import RegistrasiPegawai from "./pages/registrasiPegawai";
import Profile from "./pages/profil";
import Absen from "./pages/absen2";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {/* Admin Routes */}
        <Route path="/kodeabsen" element={<KodeAbsen />} />
        <Route path="/daftarkehadiran" element={<DaftarKehadiran />} />
        <Route path="/daftaruser" element={<DaftarUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/registrasipegawai" element={<RegistrasiPegawai />} />
        {/* Pegawai Routes */}
        <Route path="absensi" element={<Absen />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
