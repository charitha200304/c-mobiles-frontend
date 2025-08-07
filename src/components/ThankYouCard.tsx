import React from 'react';
import { Button } from './ui/button';

interface ThankYouCardProps {
  onClose: () => void;
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Thank You!</h2>
      <p className="mb-6">Your order has been placed successfully.<br />We appreciate your purchase.</p>
      <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600" onClick={onClose}>
        Continue Shopping
      </Button>
    </div>
  </div>
);

export default ThankYouCard;
