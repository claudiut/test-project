import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { mapCartActionsToProps, selectItem } from 'src/features/cart/slice';

import './CartItem.css';

function CartItem({ product, setQuantity, removeProductFromCart }) {
    const item = useSelector(selectItem(product.id));
    const [voucherCode, setVoucherCode] = useState('')

    const handleQuantityChange = ({ target: { value } }) => {
        setQuantity({ productId: product.id, quantity: value });
    }

    const handleRemove = () => {
        removeProductFromCart(product.id);
    }

    return (
        <div className="w-100">
            <div className="d-flex">
                <div className="w-100"><strong>{product.name}</strong></div>
                <button onClick={handleRemove}>X</button>
            </div>
            <div className="d-flex">
                <div>
                    <img className="cart-image" src={product.imageUrl} alt="Product" />
                </div>
                <div className="px-2">
                    <div className="fs-4">Price: ${product.price}</div>
                    <div>
                        Quantity:
                        <input type="number" min={1} value={item.quantity} onChange={handleQuantityChange} />
                    </div>
                    <div className="d-flex align-items-center">
                        <span>Voucher:</span>
                        <div>
                            <input
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                            />
                        </div>
                        <div><button className="btn btn-secondary">Apply</button></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

CartItem.propTypes = {
    product: PropTypes.object,
}

export default connect(null, mapCartActionsToProps)(CartItem);