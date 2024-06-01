import ProductsPage from "@/pages/ProductsPage";
import { Route, Routes } from "react-router-dom";



const Path = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
            </Routes>
        </>
    );
};

export default Path;
