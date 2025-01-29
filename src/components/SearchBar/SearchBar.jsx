import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useUIContext } from '@context/UIContext';

import searchIcon from '@assets/icons/actions/search-icon.svg';
import closeIcon from '@assets/icons/actions/close.svg';

import './SearchBar.scss';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useUIContext();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/shop')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="search-bar">
      <div className="container">
        <div className="search-bar__wrapper">
          <div className="search-bar__input-wrapper">
            <input
              className="search-bar__input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="What are you looking for?"
            />
            <img src={searchIcon} alt="search-icon" />
          </div>
          <button
            onClick={() => {
              setShowSearch(false);
              setSearch('');
            }}
            className="search-bar__btn-close"
          >
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
