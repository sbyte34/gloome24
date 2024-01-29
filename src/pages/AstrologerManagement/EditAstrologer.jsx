import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAstrologer = ({ astrologerId, closeModal, fetchDataFromApi, accessToken }) => {
  const [astrologerData, setAstrologerData] = useState({
    name: '',
    email: '',
    phone_number: '',
    specialization: '',
    kyc: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAstrologerData = async () => {
    try {
      const result = await axios.get(`http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getAstrologer/${astrologerId}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      setAstrologerData(result.data.payload.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/editAstrologer/${astrologerId}`, astrologerData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (astrologerId) {
      fetchAstrologerData();
    }
  }, [astrologerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Astrologer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={astrologerData.name}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone_number">
            Phone Number
          </label>
          <input
            type="number"
            id="Phone_number"
            name="Phone_number"
            value={astrologerData.phone_number}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kyc">
            KYC Status
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="kyc"
              name="kyc"
              checked={astrologerData.kyc}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="kyc" className="text-gray-700 text-sm">
              Approved
            </label>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAstrologer;
