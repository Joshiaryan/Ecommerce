import{BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails"

function App() {
    return (
        <div>
            <ProductList />
        </div>
    );
}

export default App;