import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import CenteredLayout from './components/CenterdLayout';
import Router from './components/routes/Router';
import Navbar from './components/navbars/Navbar';

export const GeneralContext=createContext();

export const RoleType = {
  user: 10,
  admin: 20,
};

function App() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
        const { userId } = decodedToken;
        const {currentUser}=decodedToken;
        setUser(currentUser)
        setUserId(userId);
        console.log(currentUser);
      }
    };
    getCurrentUser();
  }, []);
   

  return (
    <GeneralContext.Provider value={{user,setUser}}>
    <CenteredLayout>
      <Navbar />
      <Router/>
    </CenteredLayout>
    </GeneralContext.Provider>
  );
}

export default App;
