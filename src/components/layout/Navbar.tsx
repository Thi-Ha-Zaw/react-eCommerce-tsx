import Logo from "../Logo";
import SearchBar from "../SearchBar";
import CartBag from "../CartBag";

const Navbar = () => {
    return (
        <div className=" container mx-auto my-3">
            <div className="flex justify-between items-center p-4 shadow rounded-lg bg-white ">
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
