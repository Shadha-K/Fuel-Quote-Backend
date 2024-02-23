import React from 'react';
import './HomePage.css'; 

const HomePage = () => {
    return (
        <div className = "container-homepage">
            <div>
                <h1 className = "brand">Fuely</h1>
                <p className = "slogan">Putting the economy in fuel economy. Get started today.</p>
                <div className = "submit-container">
                    <button type="submit" className="submit-button">Sign Up</button>
                    <button type="submit" className="submit-button">Log In</button>
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;
