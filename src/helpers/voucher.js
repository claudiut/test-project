import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const fetchVouchersWithCodes = (codes) => {
  const controller = new AbortController();
  const { signal } = controller;

  const promise = fetch('/vouchers.json', { signal }).then((res) => res.json());
  promise.abort = controller.abort.bind(controller);

  const resPromise = promise.then((vouchers) =>
    vouchers.filter((v) => codes.includes(v.code))
  );
  resPromise.abort = promise.abort;

  return resPromise;
};

export const voucherShape = PropTypes.shape({
  code: PropTypes.string,
  priceDiscount: PropTypes.number,
});
