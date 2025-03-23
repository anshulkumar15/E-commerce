import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Update = ({ token }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBanner, setNewBanner] = useState({
    image: false,
    title: "",
    description: "",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    isActive: true,
    order: 1
  });

  // Fetch existing banners on component mount
  useEffect(() => {
    fetchBanners();
  }, [token]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        backendUrl + "/api/banner/all",
        { headers: { token } }
      );
      
      if (response.data.success) {
        setBanners(response.data.banners);
      } else {
        toast.error("Failed to fetch banners");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBanner(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setNewBanner(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const addBannerHandler = async (e) => {
    e.preventDefault();
    
    if (!newBanner.image) {
      toast.error("Please upload a banner image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", newBanner.title);
      formData.append("description", newBanner.description);
      formData.append("buttonText", newBanner.buttonText);
      formData.append("buttonLink", newBanner.buttonLink);
      formData.append("isActive", newBanner.isActive);
      formData.append("order", newBanner.order);
      formData.append("image", newBanner.image);

      const response = await axios.post(
        backendUrl + "/api/banner/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Banner added successfully");
        // Reset form
        setNewBanner({
          image: false,
          title: "",
          description: "",
          buttonText: "Shop Now",
          buttonLink: "/shop",
          isActive: true,
          order: banners.length + 1
        });
        // Refresh banners list
        fetchBanners();
      } else {
        toast.error(response.data.message || "Failed to add banner");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const deleteBanner = async (bannerId) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/banner/delete/${bannerId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Banner deleted successfully");
        fetchBanners();
      } else {
        toast.error(response.data.message || "Failed to delete banner");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const toggleBannerStatus = async (banner) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/api/banner/update/${banner._id}`,
        { isActive: !banner.isActive },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Banner status updated");
        fetchBanners();
      } else {
        toast.error(response.data.message || "Failed to update banner status");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Add New Banner</h2>
        <form onSubmit={addBannerHandler} className="flex flex-col gap-4">
          <div>
            <p className="mb-2">Banner Image (Recommended: 1920×600px)</p>
            <label htmlFor="bannerImage" className="block cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex justify-center items-center">
                {!newBanner.image ? (
                  <img src={assets.upload_area} className="w-full max-w-md h-40 object-contain" alt="Upload banner" />
                ) : (
                  <img src={URL.createObjectURL(newBanner.image)} className="w-full max-w-md h-40 object-contain" alt="Banner preview" />
                )}
              </div>
              <input
                onChange={handleImageChange}
                type="file"
                id="bannerImage"
                accept="image/*"
                className="hidden"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">Banner Title</p>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                name="title"
                placeholder="Summer Collection 2025"
                value={newBanner.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <p className="mb-2">Display Order</p>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="number"
                name="order"
                min="1"
                placeholder="1"
                value={newBanner.order}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <p className="mb-2">Banner Description</p>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded"
              name="description"
              placeholder="Discover our new collection with amazing discounts"
              value={newBanner.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">Button Text</p>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                name="buttonText"
                placeholder="Shop Now"
                value={newBanner.buttonText}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <p className="mb-2">Button Link</p>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                name="buttonLink"
                placeholder="/shop"
                value={newBanner.buttonLink}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={newBanner.isActive}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isActive" className="cursor-pointer">
              Make this banner active
            </label>
          </div>

          <button
            className="w-full md:w-48 py-3 mt-4 bg-black text-white rounded-lg disabled:bg-gray-400"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Banner"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Manage Existing Banners</h2>
        {loading && <p>Loading banners...</p>}
        
        {!loading && banners.length === 0 && (
          <p className="text-gray-500">No banners found. Add your first banner above.</p>
        )}
        
        {!loading && banners.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Order</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner._id} className="border-t">
                    <td className="py-3 px-4">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title} 
                        className="w-24 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{banner.title || "Untitled Banner"}</td>
                    <td className="py-3 px-4">{banner.order}</td>
                    <td className="py-3 px-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-sm ${
                          banner.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => toggleBannerStatus(banner)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          {banner.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button 
                          onClick={() => deleteBanner(banner._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;