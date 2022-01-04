import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsPathWithPage } from 'src/app/router/routes';

import './Pagination.css';

export default function Pagination({ currentPageNumber, pageSize, totalSize, onChange }) {
    const numberOfPages = Math.ceil(totalSize / pageSize);
    const listOfAllPages = [...Array(numberOfPages).keys()];

    const handlePageClick = (newPageNumber, e = null, disable = false) => {
        if (e && disable) {
            e.preventDefault();
            return;
        }
        onChange(newPageNumber)
    }

    return (
        <ul className="pagination">
            <li>
                <button
                    className="btn btn-link"
                    onClick={(e) => {
                        handlePageClick(currentPageNumber - 1, e, currentPageNumber < 2)
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
                            onClick={(e) => handlePageClick(pageNumber)}
                            className={`btn btn-link ${pageNumber === currentPageNumber ? "fw-bold" : ""}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                )
            })}
            <li>
                <button
                    className="btn btn-link"
                    onClick={(e) => {
                        handlePageClick(currentPageNumber + 1, e, currentPageNumber >= numberOfPages)
                    }}
                >
                    Next
                </button>
            </li>
        </ul>
    )
}

Pagination.propTypes = {
    currentPageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}