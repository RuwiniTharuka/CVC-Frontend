import { useState } from "react";
import {
  addToCart,
  getTotal,
  getTotalForLabelledPrice,
} from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { BiPhone } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.items || []);
  console.log(cart);
  //const [cartRefresh, setCartRefresh] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productID, setProductID] = useState("");
  const navigate = useNavigate();
  function placeOrder() {
    const orderData = {
      name: "name",
      address: "address",
      phoneNumber: "phone",
      email: "email",
      productID: "productID",
      billItems: [],
    };
    for (let i = 0; i < cart.length; i++) {
      orderData.billItems[i] = {
        productId: cart[i].productId,
        quantity: cart[i].quantity,
      };
    }
    /*if(token==null){
    toast.error("Please login to checkout")
    return
   }*/

    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error placing failed");
      });
  }
  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  function getTotalForLabelledPrice() {
    let total = 0;
    cart.forEach((item) => {
      total += item.labeledPrice * item.quantity;
    });
    return total;
  }
  return (
    <div className="w-full h-full flex justify-center p-[40px]">
      <div className="w-[700px]">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
            >
              <button
                className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                onClick={() => {
                  const newCart = cart.filter(
                    (product) => product.productId !== item.productId
                  );
                  setCart(newCart);
                  /* setCartLoaded(false)*/
                }}
              >
                <TbTrash />
              </button>
              <img
                src={item.images}
                className="h-full aspect-square object-cover"
              />
              <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                <h1 className="text-lg font-bold">{item.name}</h1>
                <h2 className="text-lg text-gray-500">
                  {item.altNames.join(" | ")}
                </h2>
                <h2 className="text-lg text-gray-500">
                  LKR: {item.price.toFixed(2)}
                </h2>
              </div>
              <div className="h-full w-[100px] flex justify-center items-center">
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                  onClick={() => {
                    /*addToCart(item, -1);*/
                    const newCart = cart;
                    console.log(newCart);
                    newCart[index].quantity -= 1;
                    if (newCart[index].quantity <= 0)
                      newCart[index].quantity = 1;
                    setCart(newCart);
                  }}
                >
                  -
                </button>

                <h1 className="text-xl font-bold">{item.quantity}</h1>
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                  onClick={() => {
                    addToCart(item, productID);
                    const newCart = cart;
                    newCart[index].quantity += 1;
                    setCart(newCart);
                  }}
                >
                  +
                </button>
              </div>
              <div className="h-full w-[100px] flex justify-center items-center">
                <h1 className="text-xl w-full text-end pr-2">
                  {(item.price * item.quantity).toFixed(2)}
                </h1>
              </div>
            </div>
          );
        })}
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2">
            {getTotalForLabelledPrice().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Discount</h1>
          <h1 className="w-[100px] text-xl border-b-[2px] text-end pr-2">
            {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Net Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2 border-b-[4px] border-double">
            {getTotal().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Name</h1>
          <input
            className="w-[200px] text-xl text-end pr-2 border-b-[2px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Email</h1>
          <input
            className="w-[200px] text-xl text-end pr-2 border-b-[2px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Phone</h1>
          <input
            className="w-[200px] text-xl text-end pr-2 border-b-[2px]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Address</h1>
          <input
            className="w-[200px] text-xl text-end pr-2 border-b-[2px]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end mt-4">
          <button
            className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
