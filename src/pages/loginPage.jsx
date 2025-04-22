import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  
 
  // onima data create, fetch, update, delete wage backend ekan request ekk yna method ekak nam eka async method ekak wenna oni. mkd backend eken response ekkk enkn waiting inn oni nisaa. nathm backend response eka enkn waiting inne nah issarahata ynwa method eke
  async function handleLogin() {
    try {
      console.log("Email ", email);
      console.log("Password ", password);
      setLoading(true)
      const response = await axios.post(backendUrl + "/api/user/login", {
        email: email,
        password: password
        

    }).then(
      (response) => {
      console.log("Login Successful ", response?.data);
      toast.success("Login Successful");

      localStorage.setItem("token", response?.data.token);
      const user = response?.data.user;

      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
        navigate("/");
      }
      setLoading(false)
      
    })
  }catch
     (error){
      console.log("Login Failed ", error.response.data);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false)
    }

    console.log("Login button clicked");
  }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[400px] h-[50px] border border-white  rounded-xl text-center m-[5px]"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-[400px] h-[50px] border border-white  rounded-xl text-center m-[5px]"
            type="password"
            placeholder="password"
          />
          <button
            onClick={handleLogin}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer"> 
            {
              loading?"Loading...":"Login"
            }
            </button>
           <p className="test-gray-600 text-center m-[10px]">
           Don't have an account yet?
           &nbsp;
            <span className="text-green-500 cursor-pointer hover:text-green-700">
              <Link to={"/register"}>Register Now</Link>
            </span>
            </p>
        </div>
      </div>
    </div>
  );
}
