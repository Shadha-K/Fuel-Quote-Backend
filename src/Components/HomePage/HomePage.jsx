import React from 'react';

const HomePage = () => {

    const handleClick = () => {
        window.location.href = "/login-signup";
      };

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-100 mb-6">Fuely</h1>
                <p className="text-2xl font-semibold text-gray-100 mb-8">Putting the economy in fuel economy. Get started today.</p>
                <div className="flex justify-center space-x-4">
                    <button type="submit" className="px-6 py-3 bg-purple-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:bg-purple-900 transition duration-300 ease-in-out" style={{backgroundColor: '#3c009D'}} onClick={handleClick}>Sign Up</button>
                    <button type="submit" className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in-out" style={{backgroundColor: '#eaeaea'}} onClick={handleClick}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
