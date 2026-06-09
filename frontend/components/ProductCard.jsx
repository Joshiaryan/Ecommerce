function ProductCard({ product }) {

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>   
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-800 font-medium mt-2">Price: NRS{product.price}</p>
            </div>
        </div>
    );
}
export default ProductCard;