import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Pagination({
  currentPageNumber,
  pageSize,
  totalSize,
  onChange,
}) {
  const numberOfPages = Math.ceil(totalSize / pageSize);
  const listOfAllPages = [...Array(numberOfPages).keys()];

  const disablePrev = currentPageNumber < 2;
  const disableNext = currentPageNumber >= numberOfPages;

  const handlePageClick = (newPageNumber, e = null, disable = false) => {
    if (e && disable) {
      e.preventDefault();
      return;
    }
    onChange(newPageNumber);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${disablePrev ? 'disabled' : ''}`}>
        <Button
          variant="link"
          className="page-link"
          onClick={(e) => {
            handlePageClick(currentPageNumber - 1, e, disablePrev);
          }}
        >
          Previous
        </Button>
      </li>
      {listOfAllPages.map((i) => {
        const pageNumber = i + 1;

        return (
          <li key={i} className="page-item">
            <Button
              variant="link"
              onClick={() => handlePageClick(pageNumber)}
              className={`page-link ${
                pageNumber === currentPageNumber ? 'fw-bold' : ''
              }`}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      <li className={`page-item ${disableNext ? 'disabled' : ''}`}>
        <Button
          className="page-link"
          variant="link"
          onClick={(e) => {
            handlePageClick(currentPageNumber + 1, e, disableNext);
          }}
        >
          Next
        </Button>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
