import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import routes from 'src/app/router/routes';
import { selectItemCount } from 'src/features/checkout/slice';

export default function CartMenu() {
  const numberOfItems = useSelector(selectItemCount);

  return (
    <Link
      className={`nav-link active ${numberOfItems ? 'text-primary' : ''}`}
      aria-current="page"
      to={routes.checkout}
    >
      <span>Cart {numberOfItems > 0 && `(${numberOfItems} items)`}</span>
    </Link>
  );
}
