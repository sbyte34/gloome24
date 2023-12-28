import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import AddPage from '../E-CommerceManagement/AddPage';
import ProductDetailsModal from '../E-CommerceManagement/ProductDetailsModal';

const forceUpdateReducer = (state) => state + 1;

const ProductManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ignored, forceUpdate] = useReducer(forceUpdateReducer, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/getallproducts');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [ignored]); // Add ignored to the dependency array

  const handleCreateProduct = async () => {
    console.log('Product Created');
    forceUpdate();
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    console.log('Product Delated');
    forceUpdate();
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/search?query=${query}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error.message);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== '') {
      setTimeout(() => {
        handleSearch(query);
      }, 300);
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="bg-gray-100 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSearch(searchQuery)}
                  >
                    Search
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setIsAddPageOpen(true)}
                  >
                    Create Product
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 cursor-pointer"
                    style={{ height: '400px' }}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="bg-white rounded-md shadow-md p-4 h-full flex flex-col justify-between">
                      <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover mb-2" />
                      <div>
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
                          {product.description}
                        </p>
                        <p className="text-md text-black-500 font-semibold mb-4">
                          ₹{product.selling_price} <br /> <del>₹{product.MRP}</del> {product.discount}% (Off)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      {isAddPageOpen && <AddPage onClose={() => setIsAddPageOpen(false)} onCreateProduct={handleCreateProduct} />}
      {selectedProduct && (
  <ProductDetailsModal
    product={selectedProduct}
    onClose={handleCloseProductDetails}
    onDelete={handleDeleteProduct}
    onUpdate={() => forceUpdate()}
  />
)}

    </>
  );
};

export default ProductManagement;
