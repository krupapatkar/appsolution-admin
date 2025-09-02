import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../components/AdminLayout';

const AdminProducts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchProducts();
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAllAdmin({ search: searchTerm });
      console.log('Admin products response:', response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleToggleStatus = async (product) => {
    const newStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const action = newStatus === 'INACTIVE' ? 'deactivate' : 'activate';
    
    if (window.confirm(`Are you sure you want to ${action} this product?`)) {
      try {
        console.log(`${action} product:`, product.id);
        
        // Create FormData for the update
        const formData = new FormData();
        formData.append('status', newStatus);
        
        await productsAPI.update(product.id, formData);
        console.log(`Product ${action}d successfully`);
        fetchProducts();
      } catch (error) {
        console.error(`Error ${action}ing product:`, error);
        const errorMessage = error.response?.data?.error || error.message || `Error ${action}ing product`;
        alert(errorMessage);
      }
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      console.log('Saving product data:', productData);
      if (editingProduct) {
        console.log('Updating product:', editingProduct.id);
        await productsAPI.update(editingProduct.id, productData);
        console.log('Product updated successfully');
      } else {
        console.log('Creating new product');
        await productsAPI.create(productData);
        console.log('Product created successfully');
      }
      await fetchProducts(); // Refresh the list
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error saving product. Please try again.';
      alert(errorMessage);
    }
  };
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Products Management</h1>
            <p className="text-gray-400">Manage your mobile app solutions</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Product
          </button>
        </div>

        {/* Search */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Sales</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-gray-400 text-sm">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-gray-300">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">${product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{product.sales}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'ACTIVE' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {product.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                       title="View Product"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`p-2 rounded-lg transition-colors ${
                          product.status === 'ACTIVE' 
                            ? 'text-orange-400 hover:text-orange-300 hover:bg-orange-500/20' 
                            : 'text-green-400 hover:text-green-300 hover:bg-green-500/20'
                        }`}
                        title={product.status === 'ACTIVE' ? 'Deactivate Product' : 'Activate Product'}
                      >
                        {product.status === 'ACTIVE' ? '🔒' : '✅'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No products found.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </AdminLayout>
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    fullDescription: product?.fullDescription || '',
    price: product?.price || '',
    category: product?.category || 'ecommerce',
    technologies: Array.isArray(product?.technologies) ? product.technologies.join(', ') : (product?.technologies || ''),
    features: Array.isArray(product?.features) ? product.features.join(', ') : (product?.features || ''),
    requirements: Array.isArray(product?.requirements) ? product.requirements.join(', ') : (product?.requirements || ''),
    support: Array.isArray(product?.support) ? product.support.join(', ') : (product?.support || ''),
    image: product?.image || '',
    videoUrl: product?.videoUrl || '',
    downloadUrl: product?.downloadUrl || '',
    status: product?.status || 'ACTIVE'
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [screenshotFiles, setScreenshotFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', formData);
    console.log('Image files:', imageFiles);
    console.log('Screenshot files:', screenshotFiles);
    
    const formDataToSend = new FormData();
    
    // Add text fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('fullDescription', formData.fullDescription);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('videoUrl', formData.videoUrl);
    formDataToSend.append('downloadUrl', formData.downloadUrl);
    formDataToSend.append('status', formData.status);
    
    // Add price as number
    formDataToSend.append('price', formData.price);
    
    // Add arrays as JSON strings
    formDataToSend.append('technologies', JSON.stringify(
      formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
    ));
    formDataToSend.append('features', JSON.stringify(
      formData.features.split(',').map(feature => feature.trim()).filter(Boolean)
    ));
    formDataToSend.append('requirements', JSON.stringify(
      formData.requirements.split(',').map(req => req.trim()).filter(Boolean)
    ));
    formDataToSend.append('support', JSON.stringify(
      formData.support.split(',').map(sup => sup.trim()).filter(Boolean)
    ));
    
    // Add image file
    if (imageFiles.length > 0) {
      formDataToSend.append('image', imageFiles[0]);
    }
    
    // Add screenshot files
    screenshotFiles.forEach((file, index) => {
      formDataToSend.append('screenshots', file);
    });
    
    console.log('FormData prepared, calling onSave');
    onSave(formDataToSend);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenshotFiles(files);
  };

  const removeScreenshot = (index) => {
    setScreenshotFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="ecommerce">E-Commerce</option>
                <option value="delivery">Delivery</option>
                <option value="health">Health & Fitness</option>
                <option value="social">Social</option>
                <option value="productivity">Productivity</option>
                <option value="education">Education</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              placeholder="React Native, Node.js, MongoDB"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Features (comma-separated)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              rows={2}
              placeholder="User Authentication, Payment Integration, Push Notifications"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Requirements (comma-separated)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={2}
              placeholder="Node.js 16+, MongoDB 4.4+, React Native CLI"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Support Included (comma-separated)</label>
            <textarea
              name="support"
              value={formData.support}
              onChange={handleInputChange}
              rows={2}
              placeholder="Complete Source Code, Documentation, 6 Months Support"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Main Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {formData.image && (
              <p className="text-gray-400 text-sm mt-2">Current: {formData.image}</p>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Screenshots (Multiple files)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
            />
            {screenshotFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-400 text-sm mb-2">Selected files:</p>
                <div className="space-y-1">
                  {screenshotFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded px-3 py-2">
                      <span className="text-white text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product?.screenshots && Array.isArray(product.screenshots) && product.screenshots.length > 0 && (
              <p className="text-gray-400 text-sm mt-2">
                Current screenshots: {product.screenshots.length} files
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Demo Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Download URL</label>
              <input
                type="url"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/download/..."
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;