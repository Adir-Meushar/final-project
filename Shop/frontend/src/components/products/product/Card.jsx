// CardComponent.js
import { useState, useEffect, useContext } from 'react';
import './card.css';
import ProductDetails from './ProductDetails';
import Counter from '../../counter/Counter';
import { GeneralContext } from '../../../App';

const CardComponent = ({ items }) => {
  const [modal, setModal] = useState(null);
  const [sortOption, setSortOption] = useState('low');
  const [hoveredIndex, setHoveredIndex] = useState(null);
 // Initialize counts with 0 for each item -new Array(items.length).fill(0)
  const { cart,setCart,counts, setCounts } = useContext(GeneralContext);

  useEffect(() => {
    // Ensure counts are initialized properly when items change
    setCounts(new Array(items.length).fill(0));
  }, [items]);

  const handleSortChange = (ev) => {
    setSortOption(ev.target.value);
  };

  const handleCardClick = (index) => {
    setModal(index);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleCounterChange = (index, value) => {
    const newCounts = [...counts];
    newCounts[index] += value; // Increment or decrement count for the specific item
    setCounts(newCounts);
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
        {sortItems(items).map((item, index) => (
          <div
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            key={item.title}
            className="card"
          >
            <img src={item.img.url} alt={item.title} className="card-image" />
            <div className='counter-box'>
              {hoveredIndex === index && <Counter item={item} count={counts[index]} onChange={(value) => handleCounterChange(index, value)} />}
            </div>
           
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-price">{item.price} &#8362;/{item.unit} </p>
            </div>
            
            {modal === index && (
              <ProductDetails item={item} closeModal={handleCardClick} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CardComponent;
