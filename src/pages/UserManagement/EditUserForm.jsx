// EditUserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userData, closeModal, fetchDataFromApi, accessToken }) => {
  const [editedUser, setEditedUser] = useState({
    name: userData.name,
    email: userData.email,
    phone_number: userData.phone_number,
    age: userData.age,
    gender: userData.gender,
  });

  useEffect(() => {
    // Update the form fields when userData changes
    setEditedUser({
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
      age: userData.age,
      gender: userData.gender,
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditUser = async () => {
    try {
        console.log(userData._id);
        console.log(editedUser);
      const result = await axios.post(
        "http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/updateUserByAdmin",
        {
          userID: userData._id,
          updatedData: editedUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal(); // Close the modal after editing the user
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      <input
        type="email"
        name="email"
        value={editedUser.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      <input
        type="number"
        name="phone_number"
        value={editedUser.phone_number}
        onChange={handleInputChange}
        placeholder="Phone Number"
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      <input
        type="number"
        name="age"
        value={editedUser.age}
        onChange={handleInputChange}
        placeholder="Age"
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      <input
        type="text"
        name="gender"
        value={editedUser.gender}
        onChange={handleInputChange}
        placeholder="Gender"
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={handleEditUser}
      >
        Edit User
      </button>
    </div>
  );
};

export default EditUserForm;
