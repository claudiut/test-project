import PropTypes from 'prop-types';

const itemShapeObject = {
  quantity: PropTypes.number.isRequired,
  appliedVoucherCode: PropTypes.string,
};

export const itemsShape = PropTypes.objectOf(PropTypes.shape(itemShapeObject));

export const getVoucherCodesFromItems = (items) =>
  Object.values(items)
    .map((i) => i.appliedVoucherCode)
    .filter((code) => code);
