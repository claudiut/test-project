import PropTypes from 'prop-types';
import { fetchVouchersWithCodes } from 'src/helpers/voucher';

const fetchAllProducts = () => {
  const controller = new AbortController();
  const { signal } = controller;

  const promise = fetch('/products.json', { signal }).then((res) => res.json());
  promise.abort = controller.abort.bind(controller);

  return promise;
};

export const fetchProducts = (startIndex, numberOfProductsToFetch) => {
  const promise = fetchAllProducts();

  const resPromise = promise.then((products) => ({
    items:
      startIndex === null
        ? products
        : products.slice(startIndex, startIndex + numberOfProductsToFetch),
    total: products.length,
  }));
  resPromise.abort = promise.abort;

  return resPromise;
};

export const fetchProductsWithIds = (ids) => {
  const promise = fetchAllProducts();
  const resPromise = promise.then((allProducts) => {
    const items = allProducts.filter((p) => ids.includes(p.id));
    return { items, total: items.length };
  });

  resPromise.abort = promise.abort;

  return resPromise;
};

export const productShape = PropTypes.shape({
  id: PropTypes.number,
  price: PropTypes.number,
  shortDescription: PropTypes.string,
  imageUrl: PropTypes.string,
});

export const calculateTotalPriceToPay = (cartItems) => {
  const productsIds = Object.keys(cartItems);

  const productsPromise = fetchProductsWithIds(
    productsIds.map((id) => parseInt(id, 10))
  );

  const usedVoucherCodes = [];
  Object.values(cartItems).forEach((item) => {
    if (item.appliedVoucherCode) {
      usedVoucherCodes.push(item.appliedVoucherCode);
    }
  });
  const vouchersPromise = fetchVouchersWithCodes(usedVoucherCodes);

  const resPromise = Promise.all([productsPromise, vouchersPromise]).then(
    ([{ items: products }, vouchers]) =>
      Object.entries(cartItems).reduce((acc, [productId, item]) => {
        const productPrice = products.find(
          (p) => p.id.toString() === productId
        ).price;
        const voucherDiscount = item.appliedVoucherCode
          ? vouchers.find((v) => v.code === item.appliedVoucherCode)
              .priceDiscount
          : 0;
        return acc + (productPrice - voucherDiscount) * item.quantity;
      }, 0)
  );

  resPromise.abort = productsPromise.abort;

  return resPromise;
};
