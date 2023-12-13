import React, { useState } from 'react';
import './AstrologerPayoutManagement.css'
const AstrologerPayoutManagement = () => {
    const [earnings, setEarnings] = useState(0);
    const [paymentProcessed, setPaymentProcessed] = useState(false);
  
    const handleProcessPayment = () => {
      // Implement your payment processing logic here
      // For simplicity, this example just updates the state to simulate payment processing
      setPaymentProcessed(true);
    };
  return (
    <div className="payout-management-container p-8">
    <h1 className="text-3xl font-bold mb-6">Astrologer Payout Management</h1>

    <div className="earnings-section mb-8">
      <h2 className="text-xl font-semibold mb-4">Track Earnings</h2>
      <p className="text-gray-600">Total Earnings: ${earnings}</p>
      {/* Add more details or charts for earnings tracking */}
    </div>

    <div className="payment-section">
      <h2 className="text-xl font-semibold mb-4">Process Payments</h2>
      {paymentProcessed ? (
        <p className="text-green-500">Payment Processed Successfully!</p>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleProcessPayment}
        >
          Process Payment
        </button>
      )}
    </div>
  </div>  )
}

export default AstrologerPayoutManagement
