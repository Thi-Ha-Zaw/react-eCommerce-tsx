type Props = {};

const ProductCardLoader = (props: Props) => {
    return (
        <div
            role="status"
            className=" p-4 shadow-sm rounded-lg animate-pulse md:p-6 dark:border-gray-700"
        >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
    );
};

export default ProductCardLoader;
