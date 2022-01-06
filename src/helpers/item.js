import PropTypes from 'prop-types';

const itemShapeObject = {
  quantity: PropTypes.number.isRequired,
  appliedVoucherCode: PropTypes.string,
};

// eslint-disable-next-line import/prefer-default-export
export const itemsShape = PropTypes.objectOf(PropTypes.shape(itemShapeObject));
