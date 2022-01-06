import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'src/components/List/Pagination';

export default function List(props) {
  const {
    paginate,
    itemsPerPage,
    fetchData,
    renderItem,
    currentPageIndex,
    onPageChange,
  } = props;

  const [items, setItems] = useState([]);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

  useEffect(() => {
    const fetchPageData = () => {
      const promise = fetchData(props);

      promise
        .then(({ items: fetched, total }) => {
          setItems(fetched);
          setTotalNumberOfItems(total);
        })
        .catch(() => {});

      return promise.abort;
    };

    const abort = fetchPageData();
    return abort;
  }, [fetchData, props]);

  return (
    <div>
      <div>{items.map(renderItem)}</div>
      <div className="d-flex justify-content-center">
        {paginate && (
          <Pagination
            currentPageNumber={currentPageIndex + 1}
            pageSize={itemsPerPage}
            totalSize={totalNumberOfItems}
            onChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}

List.propTypes = {
  paginate: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  currentPageIndex: PropTypes.number,
  fetchData: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  onPageChange: PropTypes.func,
};

List.defaultProps = {
  paginate: true,
  itemsPerPage: 10,
  onPageChange: () => {},
  currentPageIndex: 0,
};
