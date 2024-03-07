import React, { useContext, useEffect, useState } from "react";
import Button from "../Components/utilComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
function Login() {
  // ************ urls **********//
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL

  // ******* hook calls ********///
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (status) {
      navigate("/profile");
    }
  });
  //********State definations ******//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //************ methods *******///
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`${url}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      const { data } = await response.json();

      if (data) {
        dispatch(login(data));
        navigate("/");
      }
    } else {
      setError("Error Occured while loggin in ");
    }
    setLoading(false);
  };

  // ******** returns *********//

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loader"></span>
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
        <p>
          Not have account{" "}
          <Link className="underline text-lg" to={"/signup"}>
            Sign up.
          </Link>
        </p>
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

      </form>
    </div>
  );
}

export default Login;
