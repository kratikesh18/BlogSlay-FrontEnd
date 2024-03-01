import React, { useContext, useState } from "react";
import Button from "../Components/utilComponents/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://blogslay-backend.onrender.com/api/v1/user/register",
        {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response) {
        response.json().then((data) => {
          setUserInfo(data.data);
          navigate("/");
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full">
      <form
        className="flex flex-col w-[60%] md:w-2/6 mx-auto gap-4 md:my-48 items-center justify-center "
        onSubmit={handleSignUp}
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        {error && <p className="text-red-600 text-lg font-semibold">{error}</p>}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-400  px-4 py-2 text-lg w-full"
        />
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
          className="border-2 text-lg border-gray-400 px-4 py-2 w-full"
        />

        <Button type={"submit"} text={"SignUp"} className={"w-1/3"} />
      </form>
    </div>
  );
}

export default SignUp;
