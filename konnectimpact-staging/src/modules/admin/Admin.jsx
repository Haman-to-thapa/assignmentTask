
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from '../../context/AdminContext.jsx'
import Login from "../../components/Login";
import ParternerCampagin from "../../components/ParternerCampagin.jsx";
import CreateCampaign from "../../components/CreateCampaign.jsx";
import Leaderboard from "../../components/Leaderboard.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Home from "../../components/Home.jsx";



const AdminRoutes = () => {

  const { adminEmail } = useAppContext();
  const location = useLocation()

  const hideSidebar = location.pathname === '/';

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={!adminEmail ? <Login /> : <Navigate to="/create" />}
        />
        <Route
          path="/home"
          element={adminEmail ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/partner" element={<ParternerCampagin />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}



const Admin = () => {
  return (
    <Router>
      <AdminRoutes />
    </Router>
  )
}

export default Admin