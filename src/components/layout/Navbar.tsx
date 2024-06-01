import Logo from "../Logo";
import SearchBar from "../SearchBar";
import CartBag from "../CartBag";

const Navbar = () => {
    return (
        <div className=" sm:container sm:mx-auto my-3 sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center p-4 shadow rounded-lg">
                <Logo />
                <div className=" flex gap-2 items-end">
                    <SearchBar />

                    <CartBag />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
