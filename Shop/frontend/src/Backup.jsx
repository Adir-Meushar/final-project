// import { useState } from "react"
// import '../modal.css'
// import { productsStructure } from "../../components/products/product/ProductStructure";
// import './productForm.css'
// function NewProduct() {
//     const [modal, setModal] = useState(false);
//     const [errors, setErrors] = useState([]);
//     const [formData, setFormData] = useState({
//         category: "Vegetables",
//         title: "",
//         description: "",
//         price: "",
//         sale: "",
//         calories: "",
//         carbohydrates: "",
//         protein: "",
//         fat: "",
//         imgUrl: "",
//         imgAlt: ""
//     });


//     const inputChange = (ev) => {
//         const { name, value, type, checked } = ev.target;
//         const newValue = type === 'checkbox' ? checked : value;
//         setFormData({
//             ...formData,
//             [name]: newValue,
//         });
//     };

//     const addProduct = async (ev) => {
//         ev.preventDefault();
//         try {
//             const { imgUrl, imgAlt, calories, carbohydrates, protein, fat, ...rest } = formData;
//             const obj = {
//                 ...rest,
//                 nutritionalValue: {
//                     calories,
//                     carbohydrates,
//                     protein,
//                     fat
//                 },
//                 img: {
//                     url: imgUrl,
//                     alt: imgAlt
//                 }
//             };

//             const response = await fetch('http://localhost:4000/products', {
//                 credentials: "include",
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                     "Authorization": localStorage.token,
//                 },
//                 body: JSON.stringify(obj),
//             });

//             const data = await response.json();

//             if (data.error) {
//                 setErrors(data.error);
//             } else {
//                 setModal(false);
//                 setFormData({
//                     category: "Vegetables",
//                     title: "",
//                     description: "",
//                     price: "",
//                     sale: "",
//                     calories: "",
//                     carbohydrates: "",
//                     protein: "",
//                     fat: "",
//                     imgUrl: "",
//                     imgAlt: ""
//                 });
//                 setErrors([]);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };


//     return (
//         <>
//             <button onClick={() => setModal(true)}>New Product</button>
//             {modal && (
//                 <div className="modal-frame">
//                     <div className="modal product-modal">
//                         <header>
//                             <button className="close" onClick={() => {
//                                 setModal(false);
//                                 setFormData({
//                                     category: "Vegetables",
//                                     title: "",
//                                     description: "",
//                                     price: "",
//                                     sale: "",
//                                     calories: "",
//                                     carbohydrates: "",
//                                     protein: "",
//                                     fat: "",
//                                     imgUrl: "",
//                                     imgAlt: ""
//                                 });
//                                 setErrors([]);
//                             }}>X</button>
//                             <h2>New Product</h2>
//                         </header>
//                         <form onSubmit={addProduct}>
//                             {productsStructure.map((field, index) => (
//                                 <label key={index}>
//                                     {field.label}:
//                                     {field.label === "Category" ? (
//                                         <select
//                                             name={field.name}
//                                             onChange={inputChange}
//                                             value={formData[field.name]}
//                                         >
//                                             <option value="Vegetables">Vegetables</option>
//                                             <option value="Fruits">Fruits</option>
//                                             <option value="Eggs&Dairy">Eggs&Dairy</option>
//                                             <option value="Bakery">Bakery</option>
//                                         </select>
//                                     ) : field.type === "boolean" ? (
//                                         <input
//                                             type="checkbox"
//                                             name={field.name}
//                                             onChange={inputChange}
//                                             checked={formData[field.name]}
//                                         />
//                                     ) : field.name === "description" ? ( // Check if field is "description"
//                                         <textarea
//                                             name={field.name}
//                                             onChange={inputChange}
//                                             value={formData[field.name]}
//                                         />
//                                     ) : (
//                                         <input
//                                             type={field.type}
//                                             name={field.name}
//                                             autoComplete="off"
//                                             onChange={inputChange}
//                                             value={formData[field.name]}
//                                         />
//                                     )}
//                                 </label>
//                             ))}
//                             <button className="btnAdd">Add</button>
//                             {errors.length > 0 && (
//                                 <div className="error-messages">
//                                     <ul>
//                                         {errors.map((error, index) => (
//                                             <li style={{ color: 'red', fontSize: '.8rem' }} key={index}>{error}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default NewProduct
