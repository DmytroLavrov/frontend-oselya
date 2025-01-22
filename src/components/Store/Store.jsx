import { useShopContext } from '@context/StoreContext';
import { filterProducts } from '@utils/FilterAndSortCatalog';
import products from '@backend/products.json';

import FilterCatalog from '@components/FilterCatalog/FilterCatalog';
import Catalog from '@components/Catalog/Catalog';

import './Store.scss';

const Store = () => {
  const { selectedCategory, selectedPriceRange, categories } = useShopContext();

  const selectedCategoryLabel = () =>
    categories.find((category) => category.id === selectedCategory)?.label ||
    'All Rooms';

  const filteredProducts = () =>
    filterProducts(products, selectedCategory, selectedPriceRange);

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
