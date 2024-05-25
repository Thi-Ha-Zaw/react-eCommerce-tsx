import type { Product } from "@/app/types";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "../ui/button";

type Props = {
    product: Product;
};

const Product = ({
    product: { id, image, title, description, rating, price },
}: Props) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className=" group"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                src={image}
                className=" h-32 -mb-16 ms-5 group-hover:-rotate-6 duration-300"
                alt=""
            />
            <div
                className=" shadow group-hover:shadow-2xl duration-300 rounded-lg p-5"
                style={{ transform: isHover ? "rotateX(25deg)" : "" }}
            >
                <div className=" flex flex-col gap-2 pt-16">
                    <p className=" font-bold font-roboto_condensed line-clamp-1">
                        {title}
                    </p>
                    <p className=" text-xs line-clamp-3">{description}</p>
                    <div className=" flex justify-between mt-3">
                        <div className=" flex gap-1 items-center">
                            {Array.from({ length: 5 }, (_, i) =>
                                i < Math.ceil(rating.rate) ? (
                                    <FaStar key={i} />
                                ) : (
                                    <FaRegStar key={i} />
                                )
                            )}
                        </div>
                        <div>
                            (<span>{rating.rate}</span> /
                            <span>{rating.count}</span>)
                        </div>
                    </div>
                </div>
                <hr className=" border-gray-700 my-5" />
                <div className=" flex justify-between items-center">
                    <p className=" font-bold text-lg">
                        $<span>{price}</span>
                    </p>
                    <div>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className=" text-xs"
                        >
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
