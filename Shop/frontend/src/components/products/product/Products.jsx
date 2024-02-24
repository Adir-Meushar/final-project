// CardComponent.js
import { useState } from 'react';
import './card.css';
import ProductCard from './ProductCard';

const Products = ({ items }) => {
  const [sortOption, setSortOption] = useState('low');

  const handleSortChange = (ev) => {
    setSortOption(ev.target.value);
  };


  const sortItems = (items) => {
    return items.slice().sort((a, b) => {
      if (sortOption === 'low') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  return (
    <>
      <select name="" id="" onChange={handleSortChange}>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
      <div className="grid-container">
        {sortItems(items).map((item) => (
        <ProductCard key={item._id} item={item}/>
        ))}
      </div>
    </>
  );
};

export default Products;
