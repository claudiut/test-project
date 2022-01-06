/* eslint-disable no-param-reassign */
const { createSlice, bindActionCreators } = require('@reduxjs/toolkit');

const createCartItem = () => ({
  quantity: 1,
});

const initialState = {
  items: {},
  billingInformation: {
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    zip: '',
  },
  completed: false,
};

const setCheckoutCompleted = (state, { payload: completed }) => {
  state.completed = completed;
};

const slice = createSlice({
  name: 'checkout',
  initialState,
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

    applyProductVoucher({ items }, { payload: { productId, voucherCode } }) {
      items[productId].appliedVoucherCode = voucherCode;
    },

    removeProductFromCart(state, { payload: productId }) {
      delete state.items[productId];
    },

    setCheckoutCompleted,

    performConfirmationReset(state) {
      state.items = initialState.items;
      setCheckoutCompleted(state, { payload: false });
    },

    setBillingInformation(state, { payload: billingInformation }) {
      state.billingInformation = billingInformation;
    },
  },
});

export const mapCartActionsToProps = (dispatch) =>
  bindActionCreators(slice.actions, dispatch);

export default slice.reducer;

export const selectCartItems = (state) => state.checkout.items;

export const selectCartProductIds = (state) =>
  Object.keys(state.checkout.items);

export const selectItemCount = (state) =>
  Object.values(state.checkout.items).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

export const selectItem = (productId) => (state) =>
  state.checkout.items[productId];

export const selectCheckoutIsComplete = (state) => state.checkout.completed;

export const selectBillingInformation = (state) =>
  state.checkout.billingInformation;
