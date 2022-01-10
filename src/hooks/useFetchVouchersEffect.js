import { useEffect, useState } from 'react';
import { fetchVouchersWithCodes } from 'src/helpers/voucher';

export default function useFetchVouchersEffect(voucherCodes) {
  const [vouchers, setVouchers] = useState([]);

  const sortedCodes = [...voucherCodes].sort();

  useEffect(() => {
    const promise = fetchVouchersWithCodes(voucherCodes);
    promise.then(setVouchers).catch(() => {});

    return promise.abort;
  }, [sortedCodes.toString()]);

  return vouchers;
}
