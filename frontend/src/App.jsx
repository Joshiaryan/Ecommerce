import { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Products  list:</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="text-lg">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <h2 className="text-sm text-gray-200">{product.description}</h2>
            <p className="text-sm text-gray-700">Price: ${product.price}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;