import React, { useEffect } from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/UserManagement/user';
import Userwallet from './pages/UserManagement/userWallet';
import Activity from './pages/UserManagement/activityLogs';
import Support from './pages/UserManagement/supportTickets';
import Astrologer from './pages/AstrologerManagement/AstrologerOverviewPage'
import AstrologerSchedule from './pages/AstrologerSchedulePage';
import AstrologerPayoutManagement from './pages/AstrologerPayout'
import SupportTickets from './pages/AstrologerManagement/supportsTicketsAst';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/userwallet" element={<Userwallet />} />
        <Route exact path="/activity" element={<Activity />} />
        <Route exact path="/support" element={<Support />} />
        <Route exact path="/astrologer/*" element={<Astrologer />} />
        <Route exact path="/astrologerschedule" element={<AstrologerSchedule/>} />
        <Route exact path="/astrologerpayout" element={<AstrologerPayoutManagement/>} />
        <Route exact path="/supportTickets" element={<SupportTickets/>} />

      </Routes>
    </>
  );
}

export default App;
