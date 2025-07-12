import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaupload";

export default function EditProductForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!locationData.state) {
      toast.error("Please select a product to edit");
      navigate("/admin/products");
    }
  }, [locationData.state]);

  const [productId, setProductId] = useState(
    locationData?.state?.productId || ""
  );
  const [name, setName] = useState(locationData?.state?.name || "");
  const [altName, setAltNames] = useState(
    locationData?.state?.altNames?.join(",") || ""
  );
  const [price, setPrice] = useState(locationData?.state?.price || "");
  const [labeledPrice, setLabeledPrice] = useState(
    locationData?.state?.labeledPrice || ""
  );
  const [description, setDescription] = useState(
    locationData?.state?.description || ""
  );
  const [stock, setStock] = useState(locationData?.state?.stock || "");
  const [images, setImages] = useState([]);
  const existingImages = locationData?.state?.images || [];

  const handleSubmit = async () => {
    try {
      let result = existingImages;

      if (images.length > 0) {
        const uploadPromises = Array.from(images).map((file) =>
          uploadMediaToSupabase(file)
        );
        result = await Promise.all(uploadPromises);
      }

      const product = {
        name,
        altName: altName.split(",").map((s) => s.trim()),
        price,
        labeledPrice,
        description,
        stock,
        images: result,
      };

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Product update failed");
    }
  };

  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">
          Edit Product
        </h1>

        <input
          disabled
          value={productId}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />
        <input
          value={altName}
          onChange={(e) => setAltNames(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />
        <input
          type="number"
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labelled Price"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />

        <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
          <Link
            to={"/admin/products"}
            className="bg-red-500 text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-red-600"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-green-600"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
