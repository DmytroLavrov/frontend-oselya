import { useState } from 'react';

import { useShopContext } from '@context/StoreContext';

import { useResponsive } from '@hooks/useResponsive';

import filterIcon from '@assets/icons/actions/filter.svg';
import chevronDown from '@assets/icons/arrows/chevron-down.svg';

import './FilterCatalog.scss';
import './Categories.scss';
import './Price.scss';

const FilterCatalog = () => {
  const {
    categories,
    priceRanges,
    selectedCategory,
    selectedPriceRange,
    handleCategoryChange,
    handlePriceChange,
  } = useShopContext();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isSmallScreen = useResponsive(640);

  const handleHeaderClick = () => {
    if (isSmallScreen) {
      setIsFilterOpen((prev) => !prev);
    }
  };

  const filterStyle = isSmallScreen
    ? { rowGap: isFilterOpen ? '32px' : '0' }
    : {};

  return (
    <aside className="store__filter filter" style={filterStyle}>
      <div className="filter__header" onClick={handleHeaderClick}>
        <img src={filterIcon} alt="filter-icon" className="filter__icon" />
        <h3 className="filter__title">Filter</h3>
        {isSmallScreen && (
          <img
            src={chevronDown}
            alt="filter-icon"
            className="filter__icon"
            style={{ marginLeft: 'auto' }}
          />
        )}
      </div>
      <div
        className={`filter__options ${
          isSmallScreen && !isFilterOpen ? 'filter-hidden' : 'filter-visible'
        }`}
      >
        <div className="filter__categories categories">
          <h4 className="categories__title">CATEGORIES</h4>
          <ul className="categories__list">
            {categories.map((category) => (
              <li
                className={`categories__item${
                  category.label === selectedCategory ? ' active' : ''
                }`}
                key={category.label}
              >
                <span onClick={() => handleCategoryChange(category.label)}>
                  {category.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter__price price">
          <h4 className="price__title">PRICE</h4>
          <ul className="price__list">
            {priceRanges.map((range) => (
              <li className="price__item" key={range.id}>
                <label className="price__label">
                  <span className="price__text">{range.label}</span>
                  <input
                    type="checkbox"
                    className="price__input"
                    value={range.value}
                    checked={selectedPriceRange === range.value}
                    onChange={() => handlePriceChange(range.value)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default FilterCatalog;
