import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';
import { Button } from 'react-bootstrap';

export default function Pagination({
  currentPageNumber,
  pageSize,
  totalSize,
  onChange,
}) {
  const numberOfPages = Math.ceil(totalSize / pageSize);
  const listOfAllPages = [...Array(numberOfPages).keys()];

  const handlePageClick = (newPageNumber, e = null, disable = false) => {
    if (e && disable) {
      e.preventDefault();
      return;
    }
    onChange(newPageNumber);
  };

  return (
    <ul className="pagination">
      <li>
        <Button
          variant="link"
          onClick={(e) => {
            handlePageClick(currentPageNumber - 1, e, currentPageNumber < 2);
          }}
        >
          Previous
        </Button>
      </li>
      {listOfAllPages.map((i) => {
        const pageNumber = i + 1;

        return (
          <li key={i}>
            <Button
              variant="link"
              onClick={() => handlePageClick(pageNumber)}
              className={pageNumber === currentPageNumber ? 'fw-bold' : ''}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          variant="link"
          onClick={(e) => {
            handlePageClick(
              currentPageNumber + 1,
              e,
              currentPageNumber >= numberOfPages
            );
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
