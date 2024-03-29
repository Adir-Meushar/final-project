import { useContext, useEffect, useState } from 'react';
import './card.css';
import ProductCard from './ProductCard';
import { GeneralContext } from '../../../App';
import { useLocation } from 'react-router-dom';

const Products = ({ items }) => {
  const [sortOption, setSortOption] = useState('low');
  const { search, setSearch,isDarkMode } = useContext(GeneralContext)
  const location = useLocation(); // Get current location
  useEffect(() => {
    // Clear query when route changes
    setSearch('');
  }, [location.pathname]); // Re-run effect when pathname changes
  const handleSortChange = (ev) => {
    setSortOption(ev.target.value);
  };

  const sortItems = (items) => {
    return items&&items.length? items.slice().sort((a, b) => {
      if (sortOption === 'low') {
        return a.price - b.price;
      } else if (sortOption === 'high') {
        return b.price - a.price;
      } else if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
    }):[]
  };
  
  const filterd = search.length ? sortItems(items).filter(item=>item.title.toUpperCase().includes(search.toUpperCase())):sortItems(items);
  console.log(filterd);

  return (
    <>
      <div className={`category-select ${isDarkMode ? 'dark' : 'light'}`}>
        <select name="" id="" onChange={handleSortChange}>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div className="grid-container">
        {filterd.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Products;
