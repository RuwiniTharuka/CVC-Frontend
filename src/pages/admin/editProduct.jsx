import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaupload";

export default function EditProductForm() {
  const locationData = useLocation()
  const navigate = useNavigate();
if(locationData.state == null){
  toast.error("Please select a product to edit")
  window.location.href = "/admin/products"
}
  const [productId, setProductId] = useState(locationData.state.productId);
  const [name, setName] = useState(locationData.state.name);
  const [altName, setAltNames] = useState(locationData.state.altNames.join(","));
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setlabeledPrice] = useState(locationData.state.labeledPrice);
  const [description, setDescription] = useState(locationData.state.description);
  const [stock, setStock] = useState(locationData.state.stock);
  const [images, setImages] = useState([]);
  

  
  async function handleSubmit() {
      if(images.length===0){
        const promisesArray = [];

        for (let i = 0; i < images.length; i++) {
          const Promise=mediaUpload(images[i]);
          promisesArray[i] = Promise;
        }
      }
    try {
      let result=await Promise.all(promisesArray);
  if(images.length==0){
    result=locationData.state.images
  }
     /* for (let i = 0; i < images.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(images[i]);
      }
      const imgUrls = await Promise.all(promisesArray);*/
      const altNameInArray = altName.split(",");
      const product = {
      
        name: name,
        altName: altNameInArray,
        price:price,
        labeledPrice:labeledPrice,
        description:description,
        stock:stock,
        images: result,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Product adding failed");
    }
  }

  /* }).then(() => {
        toast.success("product adding successfully");
        navigate("/admin/products");
      }).catch(() => {
        toast.error("Product adding failed");
      })*/

  //toast.arror("file upload failed")
  //    toast.success("Form Submited")

  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">
          Edit Product
        </h1>

        <input
          disabled
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />
        <input
          value={altName}
          onChange={(e) => {
            setAltNames(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Name"
        />
        <input
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />
        <input
          value={labeledPrice}
          onChange={(e) => {
            setlabeledPrice(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labelled Price"
        />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => {
            setImages(e.target.files);
          }}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product images"
        />
        {/*stock*/}
        <input
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }}
          type="number"
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />

        <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
          <Link
            to={"/admin/products"}
            className="bg-red-500 text-white p-[10px] w-[180px] text-center rounded-lg  hover:bg-red-600 "
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-green-500 cursor-pointer text-white p-[10px]  w-[180px] text-center rounded-lg ml-[10px]  hover:bg-green-600 "
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
