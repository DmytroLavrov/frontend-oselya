import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ isProductPage = false, isContainer = true }) => {
  const location = useLocation();

  const renderBreadcrumbsList = () => {
    if (isProductPage) {
      return [
        <li key="/" className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">
            Home
          </Link>
        </li>,
        <li key="/shop" className="breadcrumbs__item">
          <Link to="/shop" className="breadcrumbs__link">
            Shop
          </Link>
        </li>,
        <li
          key="/shop/product"
          className="breadcrumbs__item breadcrumbs__item--last"
        >
          <span className="breadcrumbs__link">Product</span>
        </li>,
      ];
    }

    const pathnames = location.pathname.split('/').filter((x) => x);

    return [
      <li key="/" className="breadcrumbs__item">
        <Link to="/" className="breadcrumbs__link">
          Home
        </Link>
      </li>,
      ...pathnames.map((path, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <li
            key={url}
            className={`breadcrumbs__item ${
              isLast ? 'breadcrumbs__item--last' : ''
            }`}
          >
            <Link to={url} className="breadcrumbs__link">
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          </li>
        );
      }),
    ];
  };

  return (
    <nav
      className={`breadcrumbs ${isProductPage ? 'breadcrumbs--product' : ''}`}
    >
      {isContainer ? (
        <div className="container">
          <ul className="breadcrumbs__list">{renderBreadcrumbsList()}</ul>
        </div>
      ) : (
        <ul className="breadcrumbs__list breadcrumbs__list--centered">
          {renderBreadcrumbsList()}
        </ul>
      )}
    </nav>
  );
};

export default Breadcrumbs;
