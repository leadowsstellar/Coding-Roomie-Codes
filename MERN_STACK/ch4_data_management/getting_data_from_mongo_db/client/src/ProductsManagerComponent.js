// Write some Code here

import { useDispatch, useSelector } from 'react-redux';
import getProductsFromServer from "./redux-store/ProductsThunk";

export default function ProductsManagerComponent() {
    const productsSliceState = useSelector(store => store.productsSliceState);
    const dispatch = useDispatch();

    const getProducts = () => {
        dispatch(getProductsFromServer());
    }

    return (<div> <button onClick={getProducts} >Get Products</button>
        {productsSliceState.isLoading && <div>Please Wait ...</div>}
        {productsSliceState.error && <div style={{ color: "red" }}>{productsSliceState.error}</div>}
        {productsSliceState.products.map((product, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.quantity}</div>
            </div>
        ))}
    </div>);
}