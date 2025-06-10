import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/productitem';

const Collections = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('Relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ['Protein', 'Creatine', 'Preworkout', 'Food', 'Accessories'];

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search
    if (showsearch && search.trim() !== '') {
      const lowerSearch = search.toLowerCase();
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort by selected option
    if (sortOption === 'Low to High') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price[0] - b.price[0]);
    } else if (sortOption === 'High to Low') {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price[0] - a.price[0]);
    }

    setFilteredProducts(updatedProducts);
  }, [products, search, showsearch, selectedCategories, sortOption]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 pt-10 border-t">

      {/* Mobile Filter Button */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          Filters
          <img
            className={`h-3 transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle"
          />
        </button>

        {showFilter && (
          <div className="mt-3 border border-gray-300 rounded p-4">
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleCategoryChange}
                    className="w-4 h-4"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Layout with Filter Sidebar and Products */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Desktop Sidebar Filter */}
        <div className="hidden sm:block min-w-[200px]">
          <p className="text-xl font-semibold mb-4">FILTERS</p>
          <div className="border border-gray-300 rounded p-4">
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleCategoryChange}
                    className="w-4 h-4"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Header and Sort Dropdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Title text1="OUR" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 text-sm px-3 py-2 rounded"
            >
              <option value="Relevant">Sort by Relevant</option>
              <option value="Low to High">Sort by Low - High</option>
              <option value="High to Low">Sort by High - Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Productitem
                  key={index}
                  name={product.name}
                  id={product._id}
                  price={product.price[0]}
                  image={product.image}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
