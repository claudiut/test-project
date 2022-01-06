import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { itemsShape } from 'src/helpers/item';
import { fetchVouchersWithCodes } from 'src/helpers/voucher';
import { connect } from 'react-redux';
import { mapCartActionsToProps } from 'src/features/checkout/slice';
import { productShape } from 'src/helpers/product';

const defaultVoucherCode = '';

function VoucherModal({
  applyProductVoucher,
  items,
  product,
  show,
  onSubmitVoucher,
  onHide,
}) {
  const [voucherCode, setVoucherCode] = useState(defaultVoucherCode);
  const [applying, setApplying] = useState(false);

  const handleSubmitVoucher = () => {
    setApplying(false);
    setVoucherCode(defaultVoucherCode);
    onSubmitVoucher();
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      return;
    }

    const alreadyUsed = Object.values(items).some(
      (it) => it.appliedVoucherCode === voucherCode
    );

    setApplying(true);

    if (alreadyUsed) {
      handleSubmitVoucher();
      return;
    }

    const [voucher] = await fetchVouchersWithCodes([voucherCode]);
    if (voucher) {
      applyProductVoucher({ productId: product.id, voucherCode });
    }

    handleSubmitVoucher();
  };

  return (
    <Modal backdrop="static" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Apply Voucher</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <input
            className="form-control"
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleApplyVoucher}
          disabled={applying}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

VoucherModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSubmitVoucher: PropTypes.func.isRequired,
  applyProductVoucher: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  items: itemsShape.isRequired,
  product: productShape.isRequired,
};

export default connect(null, mapCartActionsToProps)(VoucherModal);
