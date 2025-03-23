import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import toast for error messages

const Cart = () => {
    const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        if (products.length > 0) {
            const processedCartData = Object.entries(cartItems).flatMap(([productId, sizes]) =>
                Object.entries(sizes)
                    .filter(([, quantity]) => quantity > 0)
                    .map(([size, quantity]) => ({
                        _id: productId,
                        size,
                        quantity,
                    }))
            );
            setCartData(processedCartData);
        }
    }, [cartItems, products]);

    const handleQuantityChange = (itemId, itemSize, newQuantity) => {
        if (newQuantity === "" || newQuantity === 0) {
            toast.error("Quantity must be greater than 0.");
            return;
        }
        updateQuantity(itemId, itemSize, Number(newQuantity));
    };

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div>
                {cartData.map((item, i) => {
                    const productsData = products.find((product) => product._id === item._id);

                    if (!productsData) {
                        return <div key={i}>Product not found.</div>; // Handle missing product
                    }

                    return (
                        <div
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            key={i}
                        >
                            <div className="flex items-start gap-6">
                                <img src={productsData.image[0]} className="w-16 sm:w-20" alt="" />
                                <div>
                                    <p className="text-xs sm:text-lg font-medium">{productsData.name}</p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>{currency} {productsData.price}</p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-stale-50">{item.size}</p>
                                    </div>
                                </div>
                            </div>

                            <input
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                                onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                            />
                            <img
                                src={assets.bin_icon}
                                className="w-4 mr-4 sm:w-5 cursor-pointer"
                                alt=""
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button
                            className="bg-black text-white text-sm my-8 px-8 py-3"
                            onClick={() => navigate("/place-order")}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;