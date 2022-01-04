const routes = {
    products: '/products',
    checkout: '/checkout',
    confirmation: '/confirmation',
};

export default routes;

export const getProductsPathWithPage = (pageNumber) => `${routes.products}?page=${pageNumber}`;