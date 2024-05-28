import { Sheet, SheetContent } from "@/components/ui/sheet";
import { setCartSheetOpen } from "@/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { FaCartPlus } from "react-icons/fa6";
import Cart from "./Cart";
import { Button } from "../ui/button";
import emptyCart from "../../images/emptyCart.svg";

type Props = {};

const CartSheet = (props: Props) => {
    const { isCartSheetOpen, carts } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const total = carts.reduce((pv, cv) => pv + cv.price, 0).toFixed(2);
    return (
        <Sheet
            open={isCartSheetOpen}
            onOpenChange={() => dispatch(setCartSheetOpen(!isCartSheetOpen))}
        >
            <SheetContent>
                <div className=" flex flex-col h-screen overflow-auto relative pt-3">
                    <div className=" flex gap-1 items-end px-6">
                        <p className=" flex gap-1 items-center font-serif">
                            <FaCartPlus className=" text-xl" />
                            <span className=" text-lg">Carts</span>
                        </p>
                        <span className="">- {carts.length}</span>
                    </div>
                    <div className=" flex flex-col gap-y-5 my-10 px-6">
                        {carts.length == 0 ? (
                            <>
                                <div className=" flex flex-col gap-5 justify-center shadow-sm rounded-lg p-5 border-2 border-dotted items-center px-5 mt-20">
                                    <img
                                        className=" w-3/5"
                                        src={emptyCart}
                                        alt=""
                                    />
                                   <p className=" text-sm">There is no carts. Buy something </p>
                                </div>
                            </>
                        ) : (
                            carts.map(cart => (
                                <Cart key={cart.id} cart={cart} />
                            ))
                        )}
                    </div>
                    <div className=" bg-white mt-auto z-10 sticky bottom-0 p-4 left-0">
                        <div className=" mb-3 flex justify-between items-center pt-3">
                            <p className=" font-bold">Total</p>
                            <p className=" font-bold">
                                $<span>{total}</span>
                            </p>
                        </div>

                        <Button className=" w-full">Checkout</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
