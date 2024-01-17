import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './AddPage.css';
import axios from 'axios';

const AddPage = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [astrologerData, setAstrologerData] = useState({
    email: "",
    name: "",
    phone_number: "",
    specialization: "",
    YearsOfExperience: 0,
    Rating: "",
    bio: "",
    createdAt: "", // Add createdAt field
    updatedAt: "", // Add updatedAt field
  });

  const addAstrologer = async (astrologerData) => {
    try {
      setLoading(true);

      // Get the bearer token from your authentication system
      const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQxOGI2OTI3M2Q0MDA5N2NiNTNhYSIsImlhdCI6MTcwNTQxNTk2NH0.ez815kvIU9vi5wNdW2_G3mYxTJovOtzhXr4QWUM4e4Y"; // Replace with your actual bearer token

      // Make sure to replace the URL with your actual API endpoint
      const response = await axios.post("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/createAstrologer", astrologerData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      // Handle success response
      console.log("Astrologer added successfully:", response.data);

      // Close the modal or perform any other actions upon success
      closeModal();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAstrologerData({ ...astrologerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent component's function to add the astrologer data
    addAstrologer(astrologerData);
  };

  return (
    <Modal
      isOpen={true} // Pass the modal state from the parent component
      onRequestClose={closeModal}
      contentLabel="Add Page Modal"
      className="modal md:w-1/2 lg:w-1/3 xl:w-1/4" // Use the custom modal class
      overlayClassName="modal-overlay"
    >
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
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
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Add New Astrologer</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={astrologerData.name}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={astrologerData.email}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone_number">
              Phone_number
            </label>
<input
  type="text"
  id="Phone_number"
  name="phone_number"
  value={astrologerData.phone_number}
  onChange={handleChange}
  className="border rounded-md w-full py-2 px-3"
  required
/>

          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={astrologerData.specialization}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="YearsOfExperience">
              Years of Experience
            </label>
            <input
              type="number"
              id="YearsOfExperience"
              name="YearsOfExperience"
              value={astrologerData.YearsOfExperience}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Rating">
              Rating
            </label>
            <input
              type="text"
              id="Rating"
              name="Rating"
              value={astrologerData.Rating}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Biography
            </label>
            <textarea
              id="bio"
              name="bio"
              value={astrologerData.bio}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPage;
