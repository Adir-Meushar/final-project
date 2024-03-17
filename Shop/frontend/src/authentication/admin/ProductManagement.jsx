import { useContext, useEffect, useState } from 'react'
import './users-management.css'
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import EditProduct from './EditProduct';
import { GeneralContext } from '../../App';
function ProductsManagement() {
    const [products,setProducts]=useState([]);
    const [modal,setModal]=useState(false)
    const [currentProduct,setCurrentProduct]=useState({});
    const { snackbar,setLoader} = useContext(GeneralContext);

    const fetchProducts=async ()=>{
        try{
            setLoader(true)
          const response=await fetch('http://localhost:4000/products/all', {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token,
            },
        })
         const data=await response.json();
         setProducts(data)
         setTimeout(() => {
            setLoader(false)
          }, 500)
        }catch(error){
            console.error("Error fetching users:", error);
        }
    }
    
    const deleteProduct=async(productId)=>{
        if (!window.confirm(`Are you sure you want to delete this product?`)) {
            return;
        } else {
            setLoader(true)
            try{
                const response=await fetch(`http://localhost:4000/products/${productId}`, {
                  credentials: "include",
                  method: "DELETE",
                  headers: {
                      "Content-type": "application/json",
                      "Authorization": localStorage.token,
                  },
              })
               setProducts(products.filter((product) => product._id !== productId));
              }catch(error){
                  console.error("Error Deleteing product:", error);
              }
              setTimeout(() => {
                setLoader(false)
              }, 500)
              snackbar(`Prodcut was deleted sucsesfully!`)
        }
      }
      const getOneProduct = async (productId) => {
        try {
            console.log("Fetching product details...");
            const response = await fetch(`http://localhost:4000/product/${productId}`, {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
            });
            const data = await response.json();
            console.log("Product details fetched:", data);
            setCurrentProduct(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    
   const openEditModal = async (productId) => {
    try {
        console.log("Opening edit modal...");
        await getOneProduct(productId);
        console.log("Product details loaded:", currentProduct);
        setModal(true);
    } catch (error) {
        console.error("Error opening edit modal:", error);
    }
};
    useEffect(()=>{
        fetchProducts();
    },[])
    
    useEffect(()=>{

    },[currentProduct])
    
    return (
        <div className="container-table">
            <div className='page-header'>
                <h1 >Product Management</h1>
                <p>Here you can fined information about the products.</p>
            </div>
            <table className='product-table'>
                <thead>
                    <tr >
                        <th>X</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Unit</th>
                        <th>Image</th>
                        <th>Edit Product</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.category}</td>
                            <td>{product.title}</td>
                            <td>{product.price}0&#8362;</td>
                            <td>{product.unit}</td>
                            <td><img className='table-img' src={product.img.url} alt={product.img.alt}/></td>
                            <td >< FaRegEdit className="fa-edit" onClick={() =>openEditModal(product._id)}/></td>
                            <td ><AiFillDelete className="ai-delete" onClick={()=>deleteProduct(product._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditProduct modal={modal} setModal={setModal} product={currentProduct} />

        </div>
    )
}

export default ProductsManagement
