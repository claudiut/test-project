import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Checkout from 'src/app/pages/Checkout';
import Confirmation from 'src/app/pages/Confirmation';
import Products from 'src/app/pages/Products';
import routes from 'src/app/router/routes';
import { selectCheckoutIsComplete } from 'src/features/checkout/slice';

export default function Router() {
  const checkoutCompleted = useSelector(selectCheckoutIsComplete);

  return (
    <Routes>
      <Route path={routes.products} element={<Products />} />
      <Route path={routes.checkout} element={<Checkout />} />
      <Route
        path={routes.confirmation}
        element={
          checkoutCompleted ? (
            <Confirmation />
          ) : (
            <Navigate to={routes.checkout} />
          )
        }
      />
      <Route path="*" element={<Navigate to={routes.products} />} />
    </Routes>
  );
}
