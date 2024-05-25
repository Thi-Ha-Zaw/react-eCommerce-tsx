import ProductsPage from "@/pages/ProductsPage";
import { Route, Routes } from "react-router-dom";

type Props = {};

const Path = (props: Props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
            </Routes>
        </>
    );
};

export default Path;
