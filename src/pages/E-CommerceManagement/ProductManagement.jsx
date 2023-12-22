// Import the necessary React and component styles
import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import AddPage from '../E-CommerceManagement/AddPage'; // Import your AddPage component
import ProductDetailsModal from '../E-CommerceManagement/ProductDetailsModal'; // Import your ProductDetailsModal component

const ProductManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/getallproducts');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    // Show the AddPage component or navigate to the create product page
    setIsAddPageOpen(true);
  };

  const handleProductClick = (product) => {
    // Set the selected product for detailed view
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    // Close the detailed view
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Add styling to Sidebar component */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Add styling to Header component */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="bg-gray-100 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Product Management</h1>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreateProduct}
                >
                  Create Product
                </button>
              </div>

              <div className="flex flex-wrap">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="bg-white rounded-md shadow-md p-4">
                      <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover mb-2" />
                      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                      <p
                        className="text-sm text-gray-600 mb-2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        Description: {product.description}
                      </p>
                      <p className="text-lg text-green-500 font-semibold mb-2">
                        ₹{product.selling_price} <br /> <del>₹{product.MRP}</del> {product.discount}% (Off)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Conditionally render the AddPage component */}
      {isAddPageOpen && <AddPage onClose={() => setIsAddPageOpen(false)} />}

      {/* Conditionally render the ProductDetailsModal component */}
      {selectedProduct && (
        <ProductDetailsModal product={selectedProduct} onClose={handleCloseProductDetails} />
      )}
    </>
  );
};

export default ProductManagement;
