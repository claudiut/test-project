import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const countries = ['Romania', 'England'];

export const formInfoShape = PropTypes.shape({
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  touched: PropTypes.object.isRequired,
});
