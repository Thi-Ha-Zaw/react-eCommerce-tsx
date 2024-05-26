import Logo from "../Logo";
import SearchBar from "../SearchBar";
import CartBag from "../CartBag";

const Navbar = () => {
  return (
    <div className="container mx-auto my-3">
      <div className="flex items-center justify-between rounded-lg p-4 shadow">
        <Logo />
        <div className="flex items-end gap-2">
          <SearchBar />
          <CartBag />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
