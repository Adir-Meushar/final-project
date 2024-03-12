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
// import { useEffect, useState } from 'react'
// import './users-management.css'
// import { AiFillDelete } from "react-icons/ai";
// import { FaRegEdit } from "react-icons/fa";
// import EditProduct from './EditProduct';
// function ProductsManagement() {
//     const [products,setProducts]=useState([]);
//     const [modal,setModal]=useState(false)
//     const [currentProduct,setCurrentProduct]=useState({});

//     const fetchProducts=async ()=>{
//         try{
//           const response=await fetch('http://localhost:4000/products/all', {
//             credentials: "include",
//             method: "GET",
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": localStorage.token,
//             },
//         })
//          const data=await response.json();
//          setProducts(data)
//         }catch(error){
//             console.error("Error fetching users:", error);
//         }
//     }
    
//     const deleteProduct=async(productId)=>{
//         if (!window.confirm(`Are you sure you want to delete this product?`)) {
//             return;
//         } else {
//             try{
//                 const response=await fetch(`http://localhost:4000/products/${productId}`, {
//                   credentials: "include",
//                   method: "DELETE",
//                   headers: {
//                       "Content-type": "application/json",
//                       "Authorization": localStorage.token,
//                   },
//               })
//                setProducts(products.filter((product) => product._id !== productId));
//               }catch(error){
//                   console.error("Error Deleteing product:", error);
//               }
//         }
//       }
//       const getOneProduct = async (productId) => {
//         try {
//             console.log("Fetching product details...");
//             const response = await fetch(`http://localhost:4000/product/${productId}`, {
//                 credentials: "include",
//                 method: "GET",
//                 headers: {
//                     "Content-type": "application/json",
//                     "Authorization": localStorage.token,
//                 },
//             });
//             const data = await response.json();
//             console.log("Product details fetched:", data);
//             setCurrentProduct(data);
//         } catch (error) {
//             console.error("Error fetching product details:", error);
//         }
//     };
    
//    const openEditModal = async (productId) => {
//     try {
//         console.log("Opening edit modal...");
//         await getOneProduct(productId);
//         console.log("Product details loaded:", currentProduct);
//         setModal(true);
//     } catch (error) {
//         console.error("Error opening edit modal:", error);
//     }
// };
//     useEffect(()=>{
//         fetchProducts();
//     },[])
//     useEffect(()=>{

//     },[currentProduct])
    
//     return (
//         <div className="container-table">
//             <div className='page-header'>
//                 <h1 >Product Management</h1>
//                 <p>Here you can fined information about the products.</p>
//             </div>
//             <table className='product-table'>
//                 <thead>
//                     <tr >
//                         <th>X</th>
//                         <th>Category</th>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Unit</th>
//                         <th>Image</th>
//                         <th>Edit Product</th>
//                         <th>Delete Product</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products?.map((product, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{product.category}</td>
//                             <td>{product.title}</td>
//                             <td>{product.price}0&#8362;</td>
//                             <td>{product.unit}</td>
//                             <td><img className='table-img' src={product.img.url} alt={product.img.alt}/></td>
//                             <td >< FaRegEdit className="fa-edit" onClick={() =>openEditModal(product._id)}/></td>
//                             <td ><AiFillDelete className="ai-delete" onClick={()=>deleteProduct(product._id)} /></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <EditProduct modal={modal} setModal={setModal} product={currentProduct} />

//         </div>
//     )
// }


//NOTES//
// note searchbar=101vw//