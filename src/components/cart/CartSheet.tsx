import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { setCartSheetOpen } from "@/app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

type Props = {};

const CartSheet = (props: Props) => {

    const { isCartSheetOpen } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    return (
        <Sheet
            open={isCartSheetOpen}
            onOpenChange={() => dispatch(setCartSheetOpen(!isCartSheetOpen))}
        >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
