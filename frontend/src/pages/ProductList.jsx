import { useEffect, useState } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        {product.image && <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} width="200" />}
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
