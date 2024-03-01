import { useState, useContext } from "react";
import { GeneralContext } from "../App";

function Login() {
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(GeneralContext);

  const inputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (ev, setUser) => {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (data.error) {
          setErrors(data.error);
      } else {
        localStorage.setItem("token", data.token);
        setUser(data.user); // Update user state with fetched user data
        setModal(false);
        setFormData({
          email: "",
          password: "",
        });
        setErrors([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModal(false);
    }
  };
  
  return (
    <>
      <button onClick={() => setModal(true)}>Login</button>
      {modal && (
        <div className="modal-frame">
          <div className="modal">
            <header>
              <button
                className="close"
                onClick={() => {
                  setModal(false);
                  setFormData({ email: "", password: "" });
                   setErrors([]);
                }}
              >
                X
              </button>
              <h2>Login</h2>
            </header>
            <form onSubmit={(e) => handleLogin(e, setUser)}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  onChange={inputChange}
                  value={formData.email}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={inputChange}
                  value={formData.password}
                />
              </label>
              <button>Login</button>
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
  );
}

export default Login;
