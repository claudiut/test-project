import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from 'src/app/router/routes';
import CartMenu from 'src/components/CartMenu';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Test Shop
        </span>
        <Button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </Button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={routes.products}
              >
                Products
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <CartMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
