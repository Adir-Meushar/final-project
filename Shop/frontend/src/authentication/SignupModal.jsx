import { useState } from "react"
import './modal.css'
function Signup() {
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  
  const inputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users/signup', {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName: {
            first: formData.firstName,
            last: formData.lastName,
          },
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        if (data.error.includes('Email already exists')) {
          setErrors(['Email already exists']);
        } else {
          setErrors(data.error);
        }
      } else {
        setModal(false);
        setFormData({ firstName: "", lastName: "", phone: "", email: "", password: "" }); 
        setErrors([]);
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
    { name: "password", label: "Password", type: "password" }
  ];
  return (
    <>
      <button onClick={() => setModal(true)}>Signup</button>
      {modal && (
        <div className="modal-frame">
          <div className="modal">
            <header>
              <button className="close" onClick={() => {
                setModal(false);
                setFormData({ firstName: "", lastName: "", phone: "", email: "", password: "" }); 
                setErrors([]);}}>X</button>
              <h2>Signup</h2>
            </header>
            <form onSubmit={handleSignup}>
              {inputFields.map((field, index) => (
                <label key={index}>
                  {field.label}:
                  <input
                    type={field.type}
                    name={field.name}
                    autoComplete="off"
                    onChange={inputChange}
                    value={formData[field.name]}
                  />
                </label>
              ))}
              <button>Sign</button>
              {errors.length > 0 && (
                <div className="error-messages">
                  <ul>
                    {errors.map((error, index) => (
                      <li style={{ color: 'red', fontSize: '.8rem' }} key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Signup
