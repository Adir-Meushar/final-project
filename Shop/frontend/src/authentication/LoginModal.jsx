import { useState } from "react";

function Login() {
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
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
      fetch('http://localhost:4000/users/login', {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => res.text())
      .then((data) => {
        console.log(data);
        setModal(false);
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setModal(false);
      });
    }
    return (
      <>
        <button onClick={() => setModal(true)}>Login</button>
        {modal && (
          <div className="modal-frame">
            <div className="modal">
              <header>
                <button className="close" onClick={() => { setModal(false); 
                  setFormData({ email: "", password: "" }); }}> 
                  X
                </button>
                <h2>Login</h2>
              </header>
              <form onSubmit={sendForm} >
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
                <button>Login</button>
              </form>
            </div>
          </div>
        )}
      </>
    )
}

export default Login
