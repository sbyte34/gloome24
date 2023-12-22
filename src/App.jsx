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
import Earning from './pages/FinanceManagement/earning';
import PaymentGateWay from './pages/FinanceManagement/PaymentGateWay';
import TransactionDetails from './pages/FinanceManagement/TransactionDetails';
import Reporting from './pages/FinanceManagement/Reporting';
import CallRate from './pages/ServiceManagement/CallRate';
import MessageRate from './pages/ServiceManagement/MessageRate';
import LiveSessionRate from './pages/ServiceManagement/LiveSessionRate';
import OffersDiscounts from './pages/ServiceManagement/OffersDiscounts';
import OrderManagement from './pages/E-CommerceManagement/OrderManagement';
import ProductManagement from './pages/E-CommerceManagement/ProductManagement';
import PayRefund from './pages/E-CommerceManagement/PayRefund';

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
        <Route exact path="/earning" element={<Earning/>} />
        <Route exact path="/paymentgateway" element={<PaymentGateWay/>} />
        <Route exact path="/finance/transaction-details" element={<TransactionDetails/>} />
        <Route exact path="/finance/reporting" element={<Reporting/>} />
        <Route exact path="/callrate" element={<CallRate/>} />
        <Route exact path="/messagerate" element={<MessageRate/>} />
        <Route exact path="/livesessionrate" element={<LiveSessionRate/>} />
        <Route exact path="/offersdiscounts" element={<OffersDiscounts/>} />
        <Route exact path="/ordermanagement" element={<OrderManagement/>} />
        <Route exact path="/productmanagement" element={<ProductManagement/>} />
        <Route exact path="/payrefund" element={<PayRefund/>} />

      </Routes>
    </>
  );
}

export default App;
