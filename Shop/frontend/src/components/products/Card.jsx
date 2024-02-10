import './card.css'
const CardComponent = ({ items }) => {
  return (
    <>
      <div className="grid-container">
        {items.map(item => (
          <div key={item.title} className="card">
            <img src={item.img.url} alt={item.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              {/* <p className="card-description">{item.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardComponent;
