import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import CenteredLayout from './components/CenterdLayout';
import Router from './components/routes/Router';
import Navbar from './components/navbars/Navbar';
import Snackbar from './components/snackbar/Snackbar';


export const GeneralContext=createContext();

export const RoleType = {
  guest:5,
  user: 10,
  admin: 20,
};

function App() {
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [snackbarText,setSnackbarText]=useState('')
  const [query, setQuery] = useState('');
 console.log(query);
  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
        const {currentUser}=decodedToken;
        setUser(currentUser)
   
        console.log(currentUser);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          // Token is expired, remove it from local storage
          localStorage.removeItem("token");
        }
      }
    };
    getCurrentUser();
  }, []);
   
  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };
  return (
    <GeneralContext.Provider value={{snackbar,user,setUser,count, setCount,cartProducts, setCartProducts,query, setQuery}}>
    <CenteredLayout>
      <Navbar />
      <Router/>
      {snackbarText && <Snackbar text={snackbarText} />}
    </CenteredLayout>
    </GeneralContext.Provider>
  );
}

export default App;
