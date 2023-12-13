import React, { useState } from 'react';
import axios from 'axios';
const EditAstrologerData = (props) => {
    const [formData, setFormData] = useState({
        email: props.editableData.email,
        name: props.editableData.name,
        bio: props.editableData.bio,
        phoneNumber: props.editableData.phone_number,
        specialization: props.editableData.specialization,
        yearsOfExperience: props.editableData.YearsOfExperience,
        rating: props.editableData.Rating,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        console.log(event);
        event.preventDefault();
    
        try {
            const response = await axios.put(
                `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/${props.editableData._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Handle the response
            console.log('API Response:', response.data);
        } catch (error) {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Error - Response:', error.response.data);
                console.error('Status Code:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('API Error - No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('API Error - Request setup:', error.message);
            }
        }
    };





    return (

        <div className="p-4 mt-13 sm:mt-0">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Update User Data</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => props.modalClose()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone_number">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="Phone_number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        maxLength={10}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                        Bio
                    </label>
                    <input
                        type="text"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
                        Specialization
                    </label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="border rounded-md w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearsOfExperience">
                            Years of Experience
                        </label>
                        <input
                            type="number"
                            id="yearsOfExperience"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditAstrologerData;
