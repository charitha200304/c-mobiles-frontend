import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import ThankYouCard from './ThankYouCard';
import axios from 'axios';
import React from 'react';

export function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    toggleCart, 
    clearCart 
  } = useCart();
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const handleCheckout = async () => {
    setIsPlacingOrder(true);
    try {
      // Get user details from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData.id;
      const username = userData.username || userData.name;
      if (!userId) {
        alert('You must be logged in to place an order. Please sign in.');
        setIsPlacingOrder(false);
        return;
      }
      // For each cart item, send as a separate order (like adminOrders expects)
      for (const item of cartItems) {
        await axios.post('http://localhost:3000/api/orders/place', {
          userId: Number(userId),
          username,
          itemName: item.name,
          itemPrice: Number(item.price),
          status: 'pending',
          itemStatus: 'pending',
          totalPrice: Number(item.price) * Number(item.quantity),
          date: new Date().toISOString(),
          quantity: item.quantity,
        });
      }
      clearCart();
      setShowThankYou(true);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        alert('Order failed: ' + (error.response.data?.error || JSON.stringify(error.response.data)));
      } else {
        alert('Failed to place order. Please try again.');
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={toggleCart}
        />
        
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={toggleCart}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-8">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <ShoppingCart className="h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding some items to your cart.</p>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price * item.quantity}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border rounded-md">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-2">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
                      onClick={handleCheckout}
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? 'Placing Order...' : 'Checkout'}
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="font-medium text-orange-600 hover:text-orange-500"
                        onClick={toggleCart}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showThankYou && <ThankYouCard onClose={() => { setShowThankYou(false); toggleCart(); }} />}
    </>
  );
}
