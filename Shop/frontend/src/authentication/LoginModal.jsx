import { useState, useContext } from "react";
import { GeneralContext } from "../App";
import { loginSchema } from './user/userValidation';
import { Link } from "react-router-dom";

function Login() {
  const [showSignup,setShowSignup]=useState(false);
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, snackbar,setLoader } = useContext(GeneralContext);

  const handleValid = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value }
    setFormData(obj)
    const validate = loginSchema.validate(obj, { abortEarly: false })
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
  const handleLogin = async (ev, setUser) => {
    ev.preventDefault();
    try {
      setLoader(true)
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
        setIsFormValid(false)
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
      snackbar('Email or Password is Incorrect')
    }
    setTimeout(()=>{
      setLoader(false)
    },1000)
  };
  return (
    <>
      <button className="nav-login" onClick={() => setModal(true)}>Login</button>
      {modal && (
        <div className="modal-frame">
          <div className="login-modal modal">
            <header>
              <button
                className="close-btn"
                onClick={() => {
                  setModal(false);
                  setIsFormValid(false);
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
                  onChange={handleValid}
                  value={formData.email}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={handleValid}
                  value={formData.password}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </label>
              <button className="login-btn" disabled={!isFormValid}>Login</button>
              <p>First time here? signup</p>  
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
