import { SiShopware } from "react-icons/si";

type Props = {};

const Logo = (props: Props) => {
    return (
        <div className=" flex gap-2 items-center text-2xl font-bold font-roboto_condensed">
            <SiShopware />
            <p>MyShop</p>
        </div>
    );
};

export default Logo;
