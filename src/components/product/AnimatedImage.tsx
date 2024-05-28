import { useAppSelector } from "@/app/hooks";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
    src: string;
    imgInfo: DOMRect | null;
    setIsImgAnimated: Dispatch<SetStateAction<boolean>>;
};

const AnimatedImage = ({ src, imgInfo, setIsImgAnimated }: Props) => {
    const { cartBtnInfo } = useAppSelector(state => state.product);

    

    const imgRef = useRef<HTMLImageElement | null>(null);

    const styles = {
        width: imgInfo?.width + "px",
        height: imgInfo?.height + "px",
        top: `${imgInfo?.top}px`,
        left: `${imgInfo?.left}px`,
        
    };

    useEffect(() => {
        console.log(imgInfo)
        console.log(imgRef.current?.getBoundingClientRect());
        const keyframe = [
            {
                top: imgInfo?.top + "px",
                left: imgInfo?.left + "px",
            },
            {
                top: cartBtnInfo?.top + "px",
                left: cartBtnInfo?.left + "px",
                width: 10 + "px",
                height: 10 + "px",
                rotate: "2turn",
            },
        ];

        const options: KeyframeAnimationOptions = {
            duration: 700,
            iterations: 1,
            fill: "both",
        };

        if (imgRef.current) {
            const animation = imgRef.current.animate(keyframe, options);
            const removeImg = () => setIsImgAnimated(false);
            animation.addEventListener("finish", removeImg);

            return () => {
                animation.removeEventListener("finish", removeImg);
            };
        }
    }, []);
    return <img ref={imgRef} src={src} style={styles} className=" fixed z-40" />;
};

export default AnimatedImage;
