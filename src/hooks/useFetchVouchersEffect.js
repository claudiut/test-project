import { useEffect, useState } from 'react';
import { fetchVouchersWithCodes } from 'src/helpers/voucher';

export default function useFetchVouchersEffect(voucherCodes) {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const promise = fetchVouchersWithCodes(voucherCodes);
    promise.then(setVouchers).catch(() => {});

    return promise.abort;
  }, [voucherCodes]);

  return vouchers;
}
