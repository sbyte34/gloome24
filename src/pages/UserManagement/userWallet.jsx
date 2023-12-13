import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DashboardCard13 from '../../partials/dashboard/DashboardCard13';

const UserWallet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000); // Initial balance

  const addBalance = (amount) => {
    // Add logic to update wallet balance (e.g., make API call)
    setWalletBalance(walletBalance + amount);
  };

  const deductBalance = (amount) => {
    // Add logic to update wallet balance (e.g., make API call)
    setWalletBalance(walletBalance - amount);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Wallet information */}
            <div className="mb-4">
              <p>Wallet Balance: ${walletBalance}</p>
            </div>

            {/* Wallet actions */}
            <div className="flex gap-4">
              <button onClick={() => addBalance(100)}>Add Funds</button>
              <button onClick={() => deductBalance(50)}>Deduct Funds</button>
            </div>

            {/* Cards */}
            <div className="grid-cols-12 gap-6">
              <DashboardCard13 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserWallet;
