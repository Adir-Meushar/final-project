import './footer.css'
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { useContext } from 'react';

function Footer() {
    const {isDarkMode} = useContext(GeneralContext)

    return (
        <div className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="am-footer section-padding">
                <div className="footer-links">
                    <div className="footer-links-div">
                        <h4>Categoty</h4>
                        <Link to={'/vegetables'}>
                        <p>Vegetables</p>
                        </Link>
                        <Link to={'/fruits'}>
                        <p>Fruits</p>
                        </Link>
                        <Link to={'/bakery'}>
                        <p>Bakery</p>
                        </Link>
                        <Link to={'/dairy&egss'}>
                        <p>Dairy&Egss</p>
                        </Link>
                    </div>
                    <div className="footer-links-div">
                        <h4>Grocery</h4>
                        <Link to={'/about'}>
                        <p>About</p>
                        </Link>
                        <a href="/">
                            <p>Q&A</p>
                        </a>
                       
                    </div>
                    <div className="footer-links-div">
                        <h4>Partners</h4>
                        <a href="/">
                            <p>Employer</p>
                        </a>
                    </div>
                    <div className="footer-links-div">
                        <h4>Compeny</h4>
                        <a href="/">
                            <p>Employer</p>
                        </a>
                        <a href="/">
                            <p>Employer</p>
                        </a>
                        <a href="/">
                            <p>Employer</p>
                        </a>
                    </div>
                    <div className="footer-links-div">
                        <h4>Follow Us</h4>
                        <div className="social-media">
                            <div className='media-icon'><BsFacebook/></div>
                            <div className='media-icon'><BsInstagram/></div>
                            <div className='media-icon'><BsYoutube/></div>
                            <div className='media-icon'><BsLinkedin/> </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="footer-below">
                    <div className="footer-copyright">
                        <p>All rights bla bla</p>
                    </div>
                    <div className="footer-below-links">
                        <a href=""><div><p>Terms of conditions</p></div></a>
                        <a href=""><div><p>Privacy</p></div></a>
                        <a href=""><div><p>Terms of conditions</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
