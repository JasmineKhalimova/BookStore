import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';
import Card from './Card';
import Banner from '../assets/banner.jpg'; 
import { Link } from 'react-router-dom';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // Best Sellers function
    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    // New arrivals
    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    // useEffect hook to load the products when the component is mounted
    useEffect(() => {
        loadProductsByArrival(); // Load new arrivals
        loadProductsBySell(); // Load best sellers
    }, []); // Empty dependency array means this effect runs once after the initial render

     return (
        <div>
            <div className='homepageBanner position-relative'>
                <img src={Banner} alt="Homepage banner" className='w-100'/>
                <div className='banner-content position-absolute'>
                    <span>Welcome To Nook Book</span>
                    <p>Vintage Bookstore</p>
                </div>
            </div>
            <div className='container mt-4 mb-4'>
                <h2 className="mb-4 mt-4 border-bottom pt-4 pb-1">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((product, i) => (
                        <div key={i} className="col-md-3 col-6 mb-3">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                <h2 className="mt-4 mb-4 border-bottom pt-4 pb-1">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((product, i) => (
                        <div key={i} className="col-md-3 col-6 mb-3">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='footer'>
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
        </div>
     );
};

export default Home;