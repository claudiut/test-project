const { createSlice, bindActionCreators } = require("@reduxjs/toolkit");

const createCartItem = () => ({
    quantity: 1,
    appliedVoucherId: null,
})

const slice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        vouchers: {'TEST-VOUCHER': { priceDiscount: 0.5 }}
    },
    reducers: {
        addProductToCart({ items }, { payload: productId }) {
            if (items[productId]) {
                items[productId].quantity += 1;
            } else {
                items[productId] = createCartItem();
            }
        },

        setQuantity({ items }, { payload: { productId, quantity } }) {
            if (items[productId]) {
                items[productId].quantity = parseInt(quantity, 10);
            }
        },

        applyProductVoucher({ vouchers, items }, { payload: {product, voucherCode} }) {
            if (product.canUseDiscountVoucher && vouchers[voucherCode]) {
                items[product.id].appliedVoucherId = voucherCode;
            }
        },
        
        removeProductFromCart({ items }, { payload: productId }) {
            items = items.filter((item) => item.productId !== productId)
        },
    }
});

export const mapCartActionsToProps = (dispatch) => bindActionCreators(slice.actions, dispatch);

export default slice.reducer;

export const selectCartProductIds = (state) => Object.keys(state.cart.items);
export const selectItemCount = (state) => (
    Object.values(state.cart.items).reduce((acc, item) => acc + item.quantity, 0)
);
export const selectItem = (productId) => (state) => state.cart.items[productId];