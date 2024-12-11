import { useState } from "react";
import useCart from "@/hooks/useCart";
import { Quantity } from "@/types/types";

interface ItemQuantityProps {
    item: Quantity;
}

const ItemQuantityBox: React.FC<ItemQuantityProps> = ({ item }) => {
    const cart = useCart();
    const [inputValue, setInputValue] = useState(String(item.quantity)); // String to allow clearing

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleBlurOrEnter = () => {
      let value = parseInt(inputValue, 10);
  
      // Validate the input
      if (isNaN(value) || value <= 0) {
        value = 1;
      }

      setInputValue(String(value));
      cart.updateQuantity(item.product.id, value);
    };

    const incrementQuantity = () => {
      const newQuantity = parseInt(inputValue, 10) + 1;
      setInputValue(String(newQuantity));
      cart.updateQuantity(item.product.id, newQuantity);
    };

    const decrementQuantity = () => {
      const newQuantity = Math.max(parseInt(inputValue, 10) - 1, 1); // Minimum quantity is 1
      setInputValue(String(newQuantity));
      cart.updateQuantity(item.product.id, newQuantity);
    };
  
    return (
      <div className="flex items-center">
        <button
          className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-8 h-8 flex items-center justify-center disabled:opacity-50"
          onClick={decrementQuantity}
          disabled={parseInt(inputValue, 10) <= 1}
        >-</button>
        <input
          type="text"
          className="w-10 h-8 text-center"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleBlurOrEnter();
          }}
        />
        <button
          className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={incrementQuantity}
        >+</button>
      </div>
    );
};

export default ItemQuantityBox;
