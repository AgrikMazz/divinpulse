import { Product, Quantity } from "@/types/types";

interface OrderReviewProps {
  items: Quantity[];
  shippingFee: number;
}

const OrderTable: React.FC<OrderReviewProps> = ({ items, shippingFee }) => {
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Order Review</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-gray-600">Product Name</th>
            <th className="py-2 px-4 text-gray-600">Price</th>
            <th className="py-2 px-4 text-gray-600">Qty</th>
            <th className="py-2 px-4 text-gray-600">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id} className="border-b">
              <td className="py-2 px-4 flex items-center">
                <span className="text-gray-800">{item.product.name}</span>
              </td>
              <td className="py-2 px-4 text-gray-800">Rs.{item.product.price.toFixed(2)}</td>
              <td className="py-2 px-4 text-gray-800">{item.quantity}</td>
              <td className="py-2 px-4 text-gray-800">
                Rs.{(item.product.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="py-2 px-4 text-right text-gray-600">
              Subtotal
            </td>
            <td className="py-2 px-4 text-gray-800">Rs.{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="py-2 px-4 text-right text-gray-600">
              Shipping & Handling
            </td>
            <td className="py-2 px-4 text-gray-800">Rs.{shippingFee.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="py-2 px-4 text-right font-medium text-gray-800">
              Grand Total
            </td>
            <td className="py-2 px-4 font-medium text-gray-800">
              Rs.{grandTotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderTable;
