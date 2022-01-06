import React from 'react';
import PropTypes from 'prop-types';

import './ProductItem.css';
import { connect } from 'react-redux';
import { mapCartActionsToProps } from 'src/features/checkout/slice';
import { productShape } from 'src/helpers/product';
import { Button } from 'react-bootstrap';

function ProductItem({ product, addProductToCart }) {
  if (!product) {
    return null;
  }

  const handleAddtoCart = () => {
    addProductToCart(product.id);
  };

  return (
    <div className="w-100">
      <div>
        <div>
          <h2>{product.name}</h2>
        </div>
        <div className="d-flex">
          <div>
            <img
              className="product-image"
              src={product.imageUrl}
              alt="Product"
            />
          </div>
          <div>
            <div className="text-center">
              <div className="fs-2">${product.price}</div>
              <div>
                <Button variant="primary" onClick={handleAddtoCart}>
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="m-4">{product.shortDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: productShape,
  addProductToCart: PropTypes.func,
};

ProductItem.defaultProps = {
  product: null,
  addProductToCart: () => {},
};

export default connect(null, mapCartActionsToProps)(ProductItem);
