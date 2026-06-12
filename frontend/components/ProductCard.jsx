 import {Link}from 'react-router-dom';


 function ProductCard({product}) {
    const  BASEURL =import.meta.env.VITE_BASE_URL;
    return (
        <Link to={`/products/${product.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer">
                <h2>{product.name}</h2>
                <img src={`${BASEURL}${product.image}`} alt={product.name} 
                className="w-full h-56 object-cover rounded-t-lg mb-4"/>
                <p className="text-lg font-semibold">${product.price}</p>
            </div>
        </Link>
    );
}   