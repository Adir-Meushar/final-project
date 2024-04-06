import { useContext } from 'react'
import './contact.css'
import { GeneralContext } from '../../../App'
import { FaWhatsapp } from "react-icons/fa";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GrMailOption } from "react-icons/gr";
import { GiFlamingArrow } from "react-icons/gi";

function Contact() {
    const{setLoader,isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    return (
        <>    
         <div className={`contact-box ${isDarkMode ? 'dark' : 'light'}`}>
            <img className='contact-main-img' src="https://noyhasade.co.il/_nuxt/img/pic.d8f45c2.png" alt="" />
            <div className='contact-form-box'>
                <h1>Get in Touch: We'd Love to Hear from You!</h1>
                <p>Our customer service is available and attentive to you, Sunday through Thursday, from 7:00 to 23:00, and on Fridays until 14:00, in order to provide you with quick responses and excellent service
                </p>
                <div className='form-icons-box'>
               <div className='form-icon-box' >054-3143870 <FaWhatsapp className='form-icon' /> </div>
               <div className='form-icon-box' >09-9589323 <RiCustomerServiceLine className='form-icon' /></div>
               <div className='form-icon-box' >bla@gmail.com <GrMailOption  className='form-icon' /></div>
                </div>
                {/* <div className='arrow-box'>You may leave us a message here! <GiFlamingArrow className='arrow' /></div> */}
                <form className="contact-form">
                    <label>
                        <input placeholder="First-Name" type="text" />
                    </label>
                    <label>
                        <input placeholder="Last-Name" type="text" />
                    </label>
                    <label>
                        <input placeholder="Phone" type="phone" />
                    </label>
                    <label>
                        <input placeholder="Email" type="email" />
                    </label>
                    <textarea placeholder="Your Message..." name="" cols="30" rows="10"></textarea>
                    <button className='slide'>Submit</button>
                </form>
            </div>
            <img className='berris' src="https://noyhasade.co.il/_nuxt/img/berris.1e7f40a.png" alt="" />
         </div>
    
        </>
       
    )
}

export default Contact
