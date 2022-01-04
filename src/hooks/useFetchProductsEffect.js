import { useEffect, useState } from "react"
import { fetchProductsWithIds } from "src/helpers/product";

export default function useFetchProductsEffect(productIds) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProductsWithIds(productIds).then(setProducts);
    }, [productIds])

    return products;
}
