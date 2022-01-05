import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';

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
        <button
          type="button"
          className="btn btn-link"
          onClick={(e) => {
            handlePageClick(currentPageNumber - 1, e, currentPageNumber < 2);
          }}
        >
          Previous
        </button>
      </li>
      {listOfAllPages.map((i) => {
        const pageNumber = i + 1;

        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => handlePageClick(pageNumber)}
              className={`btn btn-link ${
                pageNumber === currentPageNumber ? 'fw-bold' : ''
              }`}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li>
        <button
          type="button"
          className="btn btn-link"
          onClick={(e) => {
            handlePageClick(
              currentPageNumber + 1,
              e,
              currentPageNumber >= numberOfPages
            );
          }}
        >
          Next
        </button>
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
