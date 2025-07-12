import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";
import LoginPage from "./pages/loginPage";
import Testing from "./pages/testing";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/client/register";
import HomePage from "./pages/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <GoogleOAuthProvider clientId="974552003266-qtoh3cka4oija2gsnmnnd6kackold9kr.apps.googleusercontent.com">
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Testing" element={<Testing />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/r" element={<HomePage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
     </GoogleOAuthProvider>
  );
}
export default App;
