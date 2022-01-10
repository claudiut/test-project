import React from 'react';
import { useSearchParams } from 'react-router-dom';
import List from 'src/components/List/List';
import ProductItem from 'src/components/ProductItem/ProductItem';
import { fetchProducts } from 'src/helpers/product';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const handlePageChange = (newPageNumber) => {
    searchParams.set('page', newPageNumber);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPageIndex = parseInt(searchParams.get('page'), 10) - 1;

  return (
    <section>
      <h1>Products</h1>
      <List
        currentPageIndex={currentPageIndex}
        itemsPerPage={5}
        renderItem={(product) => (
          <ProductItem key={product.id} product={product} />
        )}
        onPageChange={handlePageChange}
        fetchData={({ currentPageIndex: pageIndex, itemsPerPage }) =>
          fetchProducts(pageIndex * itemsPerPage, itemsPerPage)
        }
      />
    </section>
  );
}
