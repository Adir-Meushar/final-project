import { useState } from "react"
import './modal.css'
function Signup() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone:"",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const inputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendForm = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:4000/users/signup', {
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
    }).then((res) => res.json())
    .then((data) => {
      if (data.error) {
        // Check for specific error messages
        if (data.error.includes('Email already exists')) {
          setErrors(['Email already exists']);
        } else {
          // If there are other validation errors, update the errors state
          setErrors(data.error);
        }
      } else {
        // If successful, close the modal and reset form and errors
        setModal(false);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
        });
        setErrors([]);
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
  };
  return (
    <>
      <button onClick={() => setModal(true)}>Signup</button>
      {modal && (
        <div className="modal-frame">
          <div className="modal">
            <header>
              <button className="close" onClick={() => { setModal(false); 
                setFormData({ firstName: "", lastName: "",phone:"", email: "", password: "" });  setErrors([]);}}> 
                X
              </button>
              <h2>Signup</h2>
            </header>
            <form onSubmit={sendForm} >
              <label>
                First Name:
                <input type="text" name="firstName" autoComplete="off"
                  onChange={inputChange} value={formData.firstName} />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastName" autoComplete="off"
                  onChange={inputChange} value={formData.lastName} />
              </label>
              <label>
                Phone:
                <input type="phone" name="phone" autoComplete="off"
                  onChange={inputChange} value={formData.phone} />
              </label>
              <label>
                Email:
                <input type="email" name="email" autoComplete="off"
                  onChange={inputChange} value={formData.email} />
              </label>
              <label>
                Password:
                <input type="password" name="password" autoComplete="off"
                  onChange={inputChange} value={formData.password} />
              </label>
              <button>Sign</button>
                 {errors.length > 0 && (
                <div className="error-messages">
                  <ul>
                    {errors.map((error, index) => (
                      <li style={{color:'red',fontSize:'.8rem'}} key={index}>{error}</li>
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
