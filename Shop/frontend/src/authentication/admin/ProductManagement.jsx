import { useContext, useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import EditProduct from './EditProduct';
import { GeneralContext } from '../../App';
import NewProduct from './NewProduct';

function ProductsManagement() {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const { snackbar, setLoader } = useContext(GeneralContext);

    const fetchProducts = async () => {
        try {
            setLoader(true);
            const response = await fetch('http://localhost:4000/products/all', {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
            });
            const data = await response.json();
            setProducts(data);
            setTimeout(() => {
                setLoader(false);
            }, 500);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const deleteProduct = async (productId) => {
        if (!window.confirm(`Are you sure you want to delete this product?`)) {
            return;
        } else {
            setLoader(true);
            try {
                const response = await fetch(`http://localhost:4000/products/${productId}`, {
                    credentials: "include",
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });
                setProducts(products.filter((product) => product._id !== productId));
            } catch (error) {
                console.error("Error Deleting product:", error);
            }
            setTimeout(() => {
                setLoader(false);
            }, 500);
            snackbar(`Product was deleted successfully!`);
        }
    }

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setModal(true);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container-table">
            <div className='page-header'>
                <h1>Product Management</h1>
                <p>Here you can find information about the products.</p>
                <p>Total Products:{products.length}</p>
                <NewProduct />
            </div>
            <table className='product-table'>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Unit</th>
                        <th>Sale</th>
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
                            <td>{product.sale?product.finalPrice:product.price}&#8362;</td>
                            <td>{product.unit}</td>
                            <td>{product.sale ? 'True' : 'False'}</td>
                            <td><img className='table-img' src={product.img.url} alt={product.img.alt} /></td>
                            <td><FaRegEdit className="fa-edit" onClick={() => openEditModal(product)} /></td>
                            <td><AiFillDelete className="ai-delete" onClick={() => deleteProduct(product._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditProduct setProducts={setProducts} products={products} modal={modal} setModal={setModal} currentProduct={currentProduct} />
        </div>
    )
}

export default ProductsManagement;
