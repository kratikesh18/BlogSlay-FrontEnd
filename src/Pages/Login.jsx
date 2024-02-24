import React, { useContext, useState } from "react";
import Button from "../Components/utilComponents/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success("Successs! loggin in ");
      response.json().then((data) => {
        setUserInfo(data.data);
        navigate("/");
      });
    } else {
      setError("Error Occured while loggin in ");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span class="loader"></span>
      </div>
    );
  }
  return (
    <div className="w-full  ">
      <form
        className="flex flex-col w-[60%] md:w-2/6 mx-auto gap-4 md:my-48 items-center justify-center "
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold">User Login</h1>
        {error && <p className="text-red-700 font-semibold">{error}</p>}
        <input
          type="text"
          name="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-400  px-4 py-2 text-lg w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password webauthn"
          className="border-2 text-lg border-gray-400 px-4 py-2 w-full"
        />

        <Button type={"submit"} text={"Login"} className={"w-1/3"} />
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
