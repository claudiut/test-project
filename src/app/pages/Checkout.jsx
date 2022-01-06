import React, { useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'src/app/router/routes';
import BillingForm from 'src/components/BillingForm';
import CartItem from 'src/components/CartItem/CartItem';
import List from 'src/components/List/List';
import {
  mapCartActionsToProps,
  selectCartItems,
  selectCartProductIds,
} from 'src/features/checkout/slice';
import { fetchProductsWithIds } from 'src/helpers/product';
import useFetchVouchersEffect from 'src/hooks/useFetchVouchersEffect';

function Checkout({ setCheckoutCompleted, setBillingInformation }) {
  const cartProductIds = useSelector(selectCartProductIds);
  const items = useSelector(selectCartItems);

  const voucherCodes = Object.values(items)
    .map((i) => i.appliedVoucherCode)
    .filter((code) => code);
  const vouchers = useFetchVouchersEffect(voucherCodes);

  const billingFormRef = useRef();

  const navigate = useNavigate();

  const handleClickNext = async () => {
    const errors = await billingFormRef.current.validateForm();
    if (Object.keys(errors).length === 0) {
      setBillingInformation(billingFormRef.current.values);
      setCheckoutCompleted(true);
      navigate(routes.confirmation);
    } else {
      // touch all fields so that the errors are rendered
      const touchedFields = {};
      Object.keys(billingFormRef.current.values).forEach((name) => {
        touchedFields[name] = true;
      });
      billingFormRef.current.setTouched(touchedFields);
    }
  };

  return (
    <section className="container-fluid">
      <h1>Checkout</h1>
      <section className="row col-12 col-md-6">
        <h2>Cart Items</h2>
        {cartProductIds.length > 0 ? (
          <List
            paginate={false}
            renderItem={(product) => (
              <CartItem
                key={product.id}
                product={product}
                vouchers={vouchers}
                items={items}
              />
            )}
            fetchData={() =>
              fetchProductsWithIds(cartProductIds.map((id) => parseInt(id, 10)))
            }
          />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>
      <h2>Billing Info</h2>
      <BillingForm ref={billingFormRef} />
      <div>
        <button
          onClick={handleClickNext}
          type="button"
          className="btn btn-primary px-4 mt-2 mb-4"
          disabled={cartProductIds.length === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
}

Checkout.propTypes = {
  setCheckoutCompleted: PropTypes.func.isRequired,
  setBillingInformation: PropTypes.func.isRequired,
};

export default connect(null, mapCartActionsToProps)(Checkout);
