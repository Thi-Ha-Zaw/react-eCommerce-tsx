import { Sheet, SheetContent } from "@/components/ui/sheet";
import { setCartSheetOpen } from "@/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { FaCartPlus } from "react-icons/fa6";
import Cart from "./Cart";
import { Button } from "../ui/button";

type Props = {};

const CartSheet = (props: Props) => {
    const { isCartSheetOpen, carts } = useAppSelector(state => state.cart);
    console.log(carts)
    const dispatch = useAppDispatch();

    const total = carts.reduce((pv, cv) => pv + parseFloat(cv.price), 0).toFixed(2);
    return (
        <Sheet
            open={isCartSheetOpen}
            onOpenChange={() => dispatch(setCartSheetOpen(!isCartSheetOpen))}
        >
            <SheetContent>
                <div className=" flex flex-col h-screen overflow-auto relative pt-3">
                    <div className=" flex gap-1 items-end px-4">
                        <p className=" flex gap-1 items-center font-serif">
                            <FaCartPlus className=" text-xl" />
                            <span className=" text-lg">Carts</span>
                        </p>
                        <span className="">- {carts.length}</span>
                    </div>
                    <div className=" flex flex-col gap-y-5 my-10 px-4">
                        {carts.map(cart => (
                            <Cart key={cart.id} cart={cart} />
                        ))}
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
