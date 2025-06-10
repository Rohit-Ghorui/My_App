import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [variants, setVariants] = useState([{ size: "", price: "" }]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    const newImages = [...images];
    newImages[index] = previewFile;
    setImages(newImages);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", price: "" }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setVariants([{ size: "", price: "" }]);
    setBestseller(false);
    setImages([null, null, null, null, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (variants.length === 0) {
      return toast.error("At least one size and price variant is required.");
    }

    const invalidVariant = variants.some(
      (v) => !v.size.trim() || isNaN(parseFloat(v.price))
    );

    if (invalidVariant) {
      return toast.error("Please enter valid sizes and numeric prices.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("bestseller", bestseller);

    const sizes = variants.map((v) => v.size.trim());
    const prices = variants.map((v) => parseFloat(v.price));

    formData.append("sizes", JSON.stringify(sizes));
    formData.append("price", JSON.stringify(prices));

    images.forEach((img, i) => {
      if (img) {
        formData.append(`image${i + 1}`, img);
      }
    });

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img?.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">Add New Product</h2>

      {/* Image Upload */}
      <div>
        <p className="font-medium text-gray-700 mb-2">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer border-2 border-dashed border-yellow-300 p-2 rounded-lg hover:border-yellow-500 transition"
            >
              <img
                src={img?.preview || assets.upload_area}
                alt=""
                className="w-full h-24 object-contain"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="font-medium text-gray-700 mb-1">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the product"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <p className="font-medium text-gray-700 mb-1">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write here"
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <p className="font-medium text-gray-700 mb-1">Product Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
        >
          <option value="">Select Category</option>
          <option value="Protein">Protein</option>
          <option value="Creatine">Creatine</option>
          <option value="Preworkout">Preworkout</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Size & Price Variants */}
      <div>
        <p className="font-medium text-gray-700 mb-2">Sizes and Prices</p>
        <div className="space-y-2">
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <input
                type="text"
                placeholder="Size (e.g., 500g)"
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                required
                className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                required
                className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addVariant}
          className="mt-2 text-sm text-yellow-600 hover:underline"
        >
          + Add another variant
        </button>
      </div>

      {/* Bestseller */}
      <div>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label htmlFor="bestseller" className="ml-2">Add to bestseller</label>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default Add;
