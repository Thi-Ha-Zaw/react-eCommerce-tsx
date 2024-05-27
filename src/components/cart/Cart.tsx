import { setCarts } from "@/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product } from "@/app/types";
import { Fade } from "react-awesome-reveal";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

type Props = {
    cart: Required<Product>;
};

const Cart = ({ cart }: Props) => {
    const { carts, allCarts } = useAppSelector(state => state.cart);

    const dispatch = useAppDispatch();

    const handleAddQuantity = () => {
        const currentProductPrice = allCarts.find(
            ct => ct.id == cart.id
        )?.price;
        console.log(currentProductPrice);
        if (currentProductPrice) {
            const updatedCarts = carts.map(ct =>
                ct.id == cart.id
                    ? {
                          ...ct,
                          quantity: ct.quantity + 1,
                          price: (
                              parseFloat(currentProductPrice) *
                              (cart.quantity + 1)
                          ).toFixed(2),
                      }
                    : ct
            );

            dispatch(setCarts(updatedCarts));
        }
    };
    return (
        <Fade>
            <div className=" group">
                <img
                    src={cart.image}
                    className=" h-12 -mb-5 ms-5 group-hover:-rotate-6 duration-300"
                    alt=""
                />
                <div className=" shadow  rounded-lg p-5 ">
                    <div className=" pt-3">
                        <p className=" font-bold text-sm font-roboto_condensed line-clamp-1">
                            {cart.title}
                        </p>
                    </div>

                    <div className=" flex justify-between items-center mt-4">
                        <p className=" font-bold text-sm">
                            $<span>{cart.price}</span>
                        </p>
                        <div>
                            <div className=" group flex items-center gap-2">
                                <div className=" bg-gray-100 rounded-xl p-1  group-hover:pointer-events-auto  group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none opacity-0 -translate-x-3 duration-300">
                                    <FiMinus className=" text-xs" />
                                </div>
                                <p>{cart.quantity}</p>
                                <button
                                    onClick={handleAddQuantity}
                                    className=" bg-gray-100 rounded-xl p-1  group-hover:pointer-events-auto  group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none opacity-0 translate-x-3 duration-300"
                                >
                                    <GoPlus className=" text-xs" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Cart;
