import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from 'src/components/CartItem/CartItem';
import List from 'src/components/List/List';
import { selectCartProductIds } from 'src/features/cart/slice';
import { fetchProductsWithIds } from 'src/helpers/product';

export default function Checkout() {
  const cartProductIds = useSelector(selectCartProductIds);

  return (
    <section className="container-fluid">
      <h1>Checkout</h1>
      <section className="row col-12 col-md-6">
        <h2>Cart Items</h2>
        <List
          paginate={false}
          renderItem={(product) => (
            <CartItem key={product.id} product={product} />
          )}
          fetchData={() =>
            fetchProductsWithIds(cartProductIds.map((id) => parseInt(id, 10)))
          }
        />
      </section>
      <div>Billing Info</div>
      <div>
        <button type="button" className="btn btn-primary">
          Next
        </button>
      </div>
    </section>
  );
}
