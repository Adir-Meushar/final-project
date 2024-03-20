import { useContext, useEffect, useState } from "react";
import '../modal.css';
import './productForm.css';
import { productValidationSchema } from "./newProdcutValid";
import { GeneralContext } from "../../App";

function EditProduct({ modal, setModal, currentProduct }) {
    console.log('currentProduct:',currentProduct);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { snackbar,setLoader} = useContext(GeneralContext);

    useEffect(() => {
        if (Object.keys(currentProduct).length) {
            setFormData(currentProduct)
        } else {
            setFormData({})
        }

    }, [currentProduct])



    const nutritionalValue = [
        { name: "calories", label: "Calories" },
        { name: "carbohydrates", label: "Carbohydrates" },
        { name: "protein", label: "Protein" },
        { name: "fat", label: "Fat" }
    ]

    const resetForm = () => {
        setFormData(currentProduct);
        setErrors([]);
    };

    const renderError = (name) => {
        return errors[name] && (
            <div className="error-message" style={{ color: "red", fontSize: ".8rem" }}>
                {errors[name]}
            </div>
        );
    };
    const handleValid = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value }
        setFormData(obj)
        const validate = productValidationSchema.validate(obj, { abortEarly: false })
        const tempErrors = { ...errors }
        delete tempErrors[name];
        if (validate.error) {
            const item = validate.error.details.find((e) => e.context.key == name)
            if (item) {
                tempErrors[name] = item.message;
            }
        }
        setIsFormValid(!validate.error)
        setErrors(tempErrors)
    }
     

    const editProduct=async(ev,productId)=>{
        ev.preventDefault();
        try {
            setLoader(true)
            const { imgUrl, imgAlt, calories, carbohydrates, protein, fat, ...rest } = formData;
            const obj = {
                ...rest,
                nutritionalValue: { calories, carbohydrates, protein, fat },
                img: { url: imgUrl, alt: imgAlt }
            };

            const response = await fetch(`http://localhost:4000/products/${productId}`, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
                body: JSON.stringify(obj),
            });

            const data = await response.json();

            if (data.error) {
                setErrors(data.error);
            } else {
                setModal(false);
                resetForm(currentProduct);
                setTimeout(() => {
                    setLoader(false)
                  }, 1000)
                  snackbar(`${data?.title} Was updated Sucsesfully!`)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    console.log(isFormValid);
    console.log(errors);
    return (
        <>
            {modal && Object.keys(formData).length && (
                <div className="modal-frame">
                    <div className="modal product-modal">
                        <header>
                            <button className="close-btn" onClick={() => { setModal(false); resetForm(); }}>X</button>
                            <h2>Edit Product</h2>
                        </header>
                        <form onSubmit={(ev) => editProduct(ev, formData._id)} >
                            <div className="form-product-header">
                                <label className="input-box">
                                    Category:
                                    <select name="category" onChange={handleValid} value={formData.category}>
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Eggs&Dairy">Eggs&Dairy</option>
                                        <option value="Bakery">Bakery</option>
                                    </select>
                                </label>
                                <label className="input-box">
                                    Title:
                                    <input type="text" autoComplete="off" onChange={handleValid} value={formData.title} name="title" />
                                    {renderError("title")}
                                </label>
                            </div>
                            <h3>Nutritional Values (100g)</h3>
                            <div className="nutrition-value">
                                {nutritionalValue?.map((item, index) => (
                                    <label key={index} className="input-box">
                                        {item.label}
                                        <input
                                            type="number"
                                            autoComplete="off"
                                            onChange={handleValid}
                                            value={formData.nutritionalValue[item.name]}
                                            name='nutritionalValue'
                                            className="input-number"
                                        />
                                        {renderError(item.name)}
                                    </label>
                                ))}
                            </div>
                            <div className="pricing">
                                <label>
                                    Price
                                    <input type="number" autoComplete="off" onChange={handleValid} value={formData.price } name="price" className="input-number" />
                                    {renderError("price")}
                                </label>
                                <label>
                                    Sale
                                    <input type="checkbox" onChange={handleValid} value={formData.sale} name="sale" />
                                </label>
                            </div>
                            <div className="unit-type">
                                Unit:
                                <label>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="kg"
                                        checked={formData.unit === 'kg'}
                                        onChange={handleValid}
                                    />
                                    KG
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="package"
                                        checked={formData.unit === 'package'}
                                        onChange={handleValid}
                                    />
                                    Package
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="unit"
                                        checked={formData.unit === 'unit'}
                                        onChange={handleValid}
                                    />
                                    Unit
                                </label>
                            </div>
                            <div className="img-details">
                                <label>
                                    Image URL:
                                    <input type="text" autoComplete="off" onChange={handleValid} value={formData.img.url} name="img" />
                                    {renderError("imgUrl")}
                                </label>
                                <label>
                                    Image Alt:
                                    <input type="text" autoComplete="off" onChange={handleValid} value={formData.img.alt} name="img" />
                                    {renderError("imgAlt")}
                                </label>
                            </div>
                            <label style={{ textAlign: 'left' }}>
                                Description
                                <textarea className="description" onChange={handleValid} value={formData.description} name="description" />
                                {renderError("description")}
                            </label>
                            <button className="btnAdd" disabled={!isFormValid}>Update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProduct;
