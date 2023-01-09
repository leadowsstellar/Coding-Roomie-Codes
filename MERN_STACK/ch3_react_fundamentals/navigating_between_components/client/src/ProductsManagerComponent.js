// < !--Write some Code here-- >

import { useState } from 'react';
export default function ProductsManagerComponent() {
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get-products', true);
        xhr.onload = () => {
            const json = xhr.responseText;
            const productsData = JSON.parse(json);
            setProducts(productsData);
        };
        xhr.send();
    }

    return (<div> <button onClick={getProducts} >Get Products</button>
        {products.map((product, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
            </div>
        ))}
    </div>);
}