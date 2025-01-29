import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="error">
      <div className="container">
        <div className="error__content">
          <FaExclamationTriangle className="error__icon" />
          <h1 className="error__title">Oops!</h1>
          <p className="error__message">Something went wrong.</p>
          <p className="error__description">
            We couldn't find the page you're looking for. Please check the URL
            or go back to the homepage.
          </p>
          <Link to="/" className="error__link">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
