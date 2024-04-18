import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
                <p className="text-lg mb-8">The page you are looking for does not exist.</p>
                {/* <button
                    className="bg-blue-500 rounded px-5 py-2 font-bold text-white"
                    onClick={login}
                >
                    Login
                </button> */}
            </div>
        </div>
    );
};

export default Page404;
