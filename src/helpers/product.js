import PropTypes from 'prop-types';

const fetchAllProducts = async () => {
  const res = await fetch('/products.json');
  return res.json();
};

export const fetchProducts = async (startIndex, numberOfProductsToFetch) => {
  const products = await fetchAllProducts();

  return {
    items:
      startIndex === null
        ? products
        : products.slice(startIndex, startIndex + numberOfProductsToFetch),
    total: products.length,
  };
};

export const fetchProductsWithIds = async (ids) => {
  const allProducts = await fetchAllProducts();
  const items = allProducts.filter((p) => ids.includes(p.id));

  return { items, total: items.length };
};

export const productShape = PropTypes.shape({
  id: PropTypes.number,
  price: PropTypes.number,
  shortDescription: PropTypes.string,
  imageUrl: PropTypes.string,
});
