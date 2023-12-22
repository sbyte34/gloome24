import React, { useState } from 'react';

const ProductDetailsModal = ({ product, onClose, onDelete, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleUpdate = async () => {
    try {
      // Make an API call to update the product
      const response = await fetch(
        `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/updateproductByid/${product._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        // If the update is successful, trigger the onUpdate callback
        onUpdate(updatedProduct);
        // Close the modal
        onClose();
      } else {
        console.error('Failed to update product:', response.statusText);
        // Handle the error accordingly (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make an API call to delete the product
      const response = await fetch(
        `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/deleteproductByid/${product._id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // If the deletion is successful, trigger the onDelete callback
        onDelete(product._id);
        // Close the modal
        onClose();
      } else {
        console.error('Failed to delete product:', response.statusText);
        // Handle the error accordingly (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    // Update the state with the changed value
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {product.name} Details
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    Description:
                    <br />
                    <textarea
                      name="description"
                      value={updatedProduct.description}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2"
                    />
                  </p>
                  <p className="text-lg text-green-500 font-semibold mb-2">
                    Selling Price: ₹
                    <input
                      type="number"
                      name="selling_price"
                      value={updatedProduct.selling_price}
                      onChange={handleChange}
                      className="border rounded-md p-2"
                    />
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    MRP: ₹
                    <input
                      type="number"
                      name="MRP"
                      value={updatedProduct.MRP}
                      onChange={handleChange}
                      className="border rounded-md p-2"
                    />
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Discount:
                    <input
                      type="number"
                      name="discount"
                      value={updatedProduct.discount}
                      onChange={handleChange}
                      className="border rounded-md p-2"
                    />
                    % Off
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleDelete}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
