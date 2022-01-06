import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  mapCartActionsToProps,
  selectCartItems,
  selectItemCount,
} from 'src/features/checkout/slice';
import { calculateTotalPriceToPay } from 'src/helpers/product';
import { useNavigate } from 'react-router-dom';
import routes from 'src/app/router/routes';

function Confirmation({ performConfirmationReset }) {
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectItemCount);
  const [totalPriceToPay, setTotalPriceToPay] = useState();
  const navigate = useNavigate();

  const handleClickConfirm = () => {
    performConfirmationReset();
    navigate(routes.products);
  };

  useEffect(() => {
    const calculateTotal = () => {
      const promise = calculateTotalPriceToPay(cartItems);
      promise.then(setTotalPriceToPay);

      return promise.abort;
    };

    const abort = calculateTotal();
    return abort;
  });

  return (
    <section>
      <h1>Summary</h1>
      <div>
        <div>Number of products to purchase: {itemCount}</div>
        <div>Total price: ${totalPriceToPay}</div>
      </div>
      <div className="mt-2">
        <Button onClick={handleClickConfirm}>Confirm Payment</Button>
      </div>
    </section>
  );
}

Confirmation.propTypes = {
  performConfirmationReset: PropTypes.func.isRequired,
};

export default connect(null, mapCartActionsToProps)(Confirmation);
