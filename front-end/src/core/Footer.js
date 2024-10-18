import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer py-4'>
            <div className='d-flex justify-content-between container'>
                <ul className='text-uppercase fw-bold'>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" >
                            Home
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop">
                            Shop
                        </Link>
                    </li>
                </ul>
                <ul className='text-uppercase fw-bold'> 
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>
                </ul>
                <ul className='text-uppercase fw-bold'>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            About
                        </Link>
                    </li> 
                </ul>
            </div>
            <div className='copyRight border-top fs-6 py-2 fw-lighter d-flex justify-content-between container'>
                <span>Copyright© {(new Date().getFullYear())} <a href="https://web-brickdesign.com/">Web-Brick Design</a></span>
                <span>Designed & Developed by Web-Brick Design</span>
            </div>
        </div>
    );
};

export default Footer;