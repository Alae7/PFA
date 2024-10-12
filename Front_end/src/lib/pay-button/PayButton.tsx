import React from 'react'
import { OrdreforPayment } from '../../interface/interface';

interface PayButtonProps {
  item: OrdreforPayment;
  handlePurchaseComplete: (order: OrdreforPayment) => void;
}

const PayButton: React.FC<PayButtonProps> = ({ item, handlePurchaseComplete }) => {
  return (
    <button
      onClick={() => handlePurchaseComplete(item)}
      type="button"
      className="font-medium bg-black text-sm flex items-center justify-center rounded-md border border-black px-14 py-2 text-white shadow-lg"
    >
      Pay Now
    </button>
  );
};

export default PayButton;