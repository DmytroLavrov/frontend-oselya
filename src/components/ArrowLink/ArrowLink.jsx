import { Link } from 'react-router-dom';

import ArrowRight from '@assets/icons/arrows/arrow-right.svg?react';

import './ArrowLink.scss';

const ArrowLink = ({ children, href }) => {
  return (
    <Link to={href} className="arrow-link">
      {children} <ArrowRight alt="arrow-right" />
    </Link>
  );
};

export default ArrowLink;
