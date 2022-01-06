import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mapCartActionsToProps } from 'src/features/checkout/slice';

import './CartItem.css';
import { productShape } from 'src/helpers/product';
import VoucherModal from 'src/components/CartItem/VoucherModal';
import { voucherShape } from 'src/helpers/voucher';
import { itemsShape } from 'src/helpers/item';
import { Button } from 'react-bootstrap';

function CartItem({
  items,
  vouchers,
  product,
  setQuantity,
  removeProductFromCart,
}) {
  const item = items[product.id];
  const appliedVoucher = vouchers.find(
    (v) => v.code === item.appliedVoucherCode
  );

  const [voucherModalOpen, setVoucherModalOpen] = useState(false);

  const handleQuantityChange = ({ target: { value } }) => {
    setQuantity({ productId: product.id, quantity: value });
  };

  const handleRemove = () => {
    removeProductFromCart(product.id);
  };

  const handleVoucherModalSubmit = () => {
    setVoucherModalOpen(false);
  };

  if (!item) {
    return null;
  }

  return (
    <div className="w-100 my-4">
      <div className="d-flex">
        <div className="w-100">
          <strong>{product.name}</strong>
        </div>
        <Button variant="danger" onClick={handleRemove}>
          Remove
        </Button>
      </div>
      <div className="d-flex">
        <div>
          <img className="cart-image" src={product.imageUrl} alt="Product" />
        </div>
        <div className="px-2">
          <div className="fs-4">
            Price:{' '}
            <span
              className={`${
                appliedVoucher ? 'text-decoration-line-through' : ''
              }`}
            >
              ${product.price * item.quantity}
            </span>
            {appliedVoucher && (
              <span className="d-inline-block ms-2">
                $
                {(product.price - appliedVoucher.priceDiscount) * item.quantity}{' '}
                <span className="text-secondary">
                  {`(saved $${appliedVoucher.priceDiscount * item.quantity})`}
                </span>
              </span>
            )}
          </div>
          <div className="py-2 d-flex align-items-center">
            <span>Quantity:</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="cart-item-quantity form-control ms-2"
            />
          </div>
          <div className="d-flex align-items-center">
            {product.canUseDiscountVoucher && (
              <>
                <Button
                  variant="info"
                  onClick={() => setVoucherModalOpen(true)}
                >
                  Apply Voucher
                </Button>
                <VoucherModal
                  items={items}
                  product={product}
                  show={voucherModalOpen}
                  onSubmitVoucher={handleVoucherModalSubmit}
                  onHide={() => setVoucherModalOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  items: itemsShape.isRequired,
  product: productShape.isRequired,
  removeProductFromCart: PropTypes.func,
  setQuantity: PropTypes.func,
  vouchers: PropTypes.arrayOf(voucherShape).isRequired,
};

CartItem.defaultProps = {
  removeProductFromCart: () => {},
  setQuantity: () => {},
};

export default connect(null, mapCartActionsToProps)(CartItem);
