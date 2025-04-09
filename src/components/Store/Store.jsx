import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@features/products/productSlice';

import { useShopContext } from '@context/StoreContext';
import { useUIContext } from '@context/UIContext';

import { filterProducts } from '@utils/FilterAndSortCatalog';

import FilterCatalog from '@components/FilterCatalog/FilterCatalog';
import Catalog from '@components/Catalog/Catalog';

import './Store.scss';

const Store = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.product);

  const { selectedCategory, selectedPriceRange, categories } = useShopContext();
  const { search, setSearch } = useUIContext();

  const selectedCategoryLabel = () =>
    categories.find((category) => category.id === selectedCategory)?.label ||
    'All Rooms';

  const filteredProducts = () => {
    const filtered = filterProducts(
      items,
      selectedCategory,
      selectedPriceRange
    );
    return filtered.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="store">
      <div className="container">
        <div className="store__grid">
          <FilterCatalog />
          <Catalog
            products={filteredProducts()}
            selectedCategoryLabel={selectedCategoryLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default Store;
