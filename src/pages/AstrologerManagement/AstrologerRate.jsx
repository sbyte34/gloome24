import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const AstrologerRate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [astrologers, setAstrologers] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getallAstrologers');
                setAstrologers(response.data.payload);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                    {/* Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <h1 className="text-3xl font-semibold mb-6">AstrologerRate</h1>
                        
                        {/* Display amount for each astrologer */}
                        <div className="grid grid-cols-1 gap-4">
                            {astrologers.map((astrologer) => (
                                <div key={astrologer.data._id} className="bg-white p-4 rounded-md shadow-md">
                                    <h2 className="text-xl font-semibold mb-2">{astrologer.data.name}</h2>
                                    <p>Amount: {astrologer.data.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AstrologerRate;
