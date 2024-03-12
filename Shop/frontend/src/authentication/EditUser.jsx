import { useContext, useEffect, useState } from "react"
import './modal.css'
import {  updateSchema } from "./userValidation";
import { GeneralContext } from "../App";
function EditUser() {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);
    const { user, setUser, snackbar } = useContext(GeneralContext);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:4000/users/${user._id}`, {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.token,
                        },
                    });
                    const userData = await response.json();
                    console.log(userData);
                    
                    setFormData({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        phone: userData.phone,
                        email: userData.email,
                        // password: userData.password, // Assuming user.password is the correct field
                        city: userData.city,
                        street: userData.street,
                        houseNumber: userData.houseNumber
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
    
        fetchData();
    }, [user]);
    

    const handleValid = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value }
        setFormData(obj)
        const validate = updateSchema.validate(obj, { abortEarly: false })
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
  console.log(errors);

    const updateUser = async (ev,userId) => {
        ev.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}`, {
                credentials: "include",
                method: "PUT",
                headers: { "Content-type": "application/json",
                "Authorization": localStorage.token,
            },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.error) {
                if (data.error.includes('Email already exists')) {
                    snackbar('Email already exists');
                } else {
                    setErrors(data.error);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputFields = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "phone", label: "Phone", type: "phone" },
        { name: "email", label: "Email", type: "email" },
        { name: "city", label: "City", type: "text" },
        { name: "street", label: "Street", type: "text" },
        { name: "houseNumber", label: "House Number", type: "text" },
    ];

    return (
        <>
            <div className="signup-modal modal">
                <h2>My Details</h2>
                <form onSubmit={(ev) => updateUser(ev, user._id)}>
                    {inputFields.map((field, index) => (
                        <label key={index}>
                            {field.label}:
                            <input
                                type={field.type}
                                name={field.name}
                                autoComplete="off"
                                onChange={handleValid}
                                value={formData[field.name] || ""}
                            />
                            {errors[field.name] && (
                                <div className="error-message">{errors[field.name]}</div>
                            )}
                        </label>
                    ))}
                    <button className="signup-btn" disabled={!isFormValid}>Update</button>
                </form>
            </div>
        </>
    )
}

export default EditUser
