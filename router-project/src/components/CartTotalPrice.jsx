import { useEffect, useState } from "react";

const CartTotalPrice = (props) => {

  const { items, onClearCart } = props;

  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(40);     
  const [protectFee, setProtectFee] = useState(19);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {

    const total = items.reduce((acc, item) => acc + item.price * item.quantity,0);
    setMrp(total);

    const calcDiscount = Math.floor(total * (coupon / 100));
    setDiscount(calcDiscount);


    const grandTotal = total - calcDiscount - coupon + protectFee;
    setTotalAmount(grandTotal);


    setTotalSavings(calcDiscount + coupon);

  }, [items]);

  return (
    <div className="w-full lg:w-[320px] h-fit sticky top-24 bg-white shadow-lg shadow-gray-300 p-5 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 border-b pb-3">PRICE DETAILS</h1>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-700">Price ({items.length} items)</span>
          <span className="font-semibold">₹{mrp}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span className="text-gray-700">Discount</span>
          <span className="font-semibold">−₹{discount}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span className="text-gray-700">Coupon</span>
          <span className="font-semibold">−{coupon}%</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Protect Promise Fee</span>
          <span className="font-semibold">+₹{protectFee}</span>
        </div>
      </div>

      <div className="border-t border-b py-3 mb-4">
        <div className="flex justify-between text-lg font-bold text-blue-700">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <p className="text-green-600 font-semibold text-sm mb-4">
         You save <span className="text-indigo-700 font-bold">₹{totalSavings}</span> on this order
      </p>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition mb-2">
        Place Order
      </button>

      <button 
        onClick={onClearCart}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartTotalPrice;