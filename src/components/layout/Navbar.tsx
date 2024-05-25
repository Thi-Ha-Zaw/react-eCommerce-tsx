import { SiShopware } from "react-icons/si";
import { FaShopify } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className=" container mx-auto my-3">
            <div className="flex justify-between items-center p-4 shadow rounded-lg">
                <div className=" flex gap-2 items-center text-2xl font-bold font-roboto_condensed">
                    <SiShopware />
                    <p>MyShop</p>
                </div>
                <div className=" flex gap-2 items-end">
                    <div>
                        <input
                            type="text"
                            className=" border-b-2 border-gray-500 outline-none px-3 py-1"
                        />
                    </div>

                    <button
                        type="button"
                        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-800 rounded-xl hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        <FaShopify className=" text-xl" />
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                            20
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
