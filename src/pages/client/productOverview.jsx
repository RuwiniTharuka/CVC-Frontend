import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";
import axios from "axios";

export default function ProductOverview() {
  const { Id } = useParams(); // use lowercase 'id'
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading', 'loaded', 'error'
  const navigate = useNavigate();
  useEffect(() => {
    if (!Id) {
      window.location.href = "/products";
      return;
    }

    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${Id}`)
        .then((res) => {
          setProduct(res.data.product);
          setStatus("loaded");
        })
        .catch(() => {
          toast.error("Product is not available");
          setStatus("error");
        });
    }
  }, [status, Id]);

  if (status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {product && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[50%] h-full p-[40px]">
            <h1 className="text-3xl font-bold text-center mb-[40px]">
              {product.name}
              {" | "}
              <span className="text-3xl mr-[20px] text-gray-500">
                {product.altNames.join(" | ")}
              </span>
            </h1>

            <div className="w-full flex justify-center mb-[40px]">
              {product.labeledPrice > product.price ? (
                <>
                  <h2 className="text-2xl mr-[20px]">
                    LKR: {product.price.toFixed(2)}
                  </h2>
                  <h2 className="text-2xl line-through text-gray-500">
                    LKR: {product.labeledPrice.toFixed(2)}
                  </h2>
                </>
              ) : (
                <h2 className="text-2xl mr-[20px]">
                  LKR: {product.price.toFixed(2)}
                </h2>
              )}
            </div>

            <p className="text-xl text-center text-gray-500 mb-[40px]">
              {product.description}
            </p>

            <div className="w-full flex justify-center mb-[40px]">
              <button
                className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300 ease-in-out"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          name: product.name,
                          altNames: product.altNames,
                          price: product.price,
                          labeledPrice: product.labeledPrice,
                          images: product.images[0],
                          quantity: 1,
                        },
                      ],
                    },
                  });
                }}
                className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300 ease-in-out ml-[20px]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
