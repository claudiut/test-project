const fetchAllProducts = async () => {
    const res = await fetch('/products.json')
    return await res.json();
}

export const fetchProducts = async (startIndex, numberOfProductsToFetch) => {
    const products = await fetchAllProducts();

    return {
        items: startIndex === null 
            ? products
            : products.slice(startIndex, startIndex + numberOfProductsToFetch),
        total: products.length
    };
}

export const fetchProductsWithIds = async (ids) => {
    const allProducts = await fetchAllProducts();
    const items = allProducts.filter((p) => ids.includes(p.id));
    
    return { items, total: items.length };
}