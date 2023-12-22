import React, { useState } from 'react';

const AddPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    MRP: '',
    discount: '',
    quantity: '',
    description: '',
    images: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('MRP', formData.MRP);
      formDataWithImage.append('discount', formData.discount);
      formDataWithImage.append('quantity', formData.quantity);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('images', formData.images);

      const response = await fetch('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/createproducts', {
        method: 'POST',
        body: formDataWithImage,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product created successfully:', data);

        // Close the modal or take any other necessary action
        onClose();
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const calculateSellingPrice = () => {
    // Calculate selling price after discount based on your logic
    const mrp = parseFloat(formData.MRP);
    const discount = parseFloat(formData.discount);
    const discountedPrice = mrp - (mrp * discount) / 100;

    return discountedPrice.toFixed(2);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="MRP">
              MRP
            </label>
            <input
              type="text"
              id="MRP"
              name="MRP"
              value={formData.MRP}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
              Discount
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Product
          </button>
        </form>

        {/* Display selling price after discount */}
        {formData.MRP && formData.discount && (
          <div className="mt-4">
            <p className="text-gray-700 text-sm font-bold mb-2">Selling Price After Discount:</p>
            <p>${calculateSellingPrice()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPage;
