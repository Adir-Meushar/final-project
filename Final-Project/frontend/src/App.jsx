import './App.css';
import CenteredLayout from './components/CenterdLayout';
import Navbar from './components/Navbar';

function App() {
  return (
    <CenteredLayout>
      <Navbar/>
      <img style={{width:"100%",height:"60vh"}} src="https://www.bhg.com/thmb/Mwd_YEkDbVg_fPsUDcWr3eZk9W0=/5645x0/filters:no_upscale():strip_icc()/difference-between-fruits-vegetables-01-5f92e7ec706b463287bcfb46985698f9.jpg" alt="" />
      
    </CenteredLayout>
  );
}

export default App;
