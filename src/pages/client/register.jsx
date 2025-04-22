import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  async function handleRegister() {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Exclude confirmPassword before sending
      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post(backendUrl + "/api/user/", dataToSend);
      toast.success("Registration Successful");
      console.log("Registered user:", response.data);

      navigate("/login");
    } catch (error) {
      console.log("Registration Failed:", error.response?.data);
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] min-h-[750px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center p-4">
          {[
            { name: "email", type: "email" },
            { name: "firstName", type: "text" },
            { name: "lastName", type: "text" },
            { name: "phone", type: "text" },
            { name: "password", type: "password" },
            { name: "confirmPassword", type: "password" },
          ].map((field, index) => (
            <input
              key={index}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
              }
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
              type={field.type}
              placeholder={field.name
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            />
          ))}

          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer mt-3"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-600 text-center mt-[10px]">
            Already have an account?
            &nbsp;
            <span className="text-green-500 cursor-pointer hover:text-green-700">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
