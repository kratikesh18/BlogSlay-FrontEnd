import React, { useEffect, useState } from "react";
import PostCard from "../Components/Posts-container/PostCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function YourPosts() {
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL;

  const [allMyPosts, setAllMyposts] = useState([]);

  useEffect(() => {
    function fetchMyPosts() {
      fetch(`${url}/api/v1/user/getMyPosts`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => setAllMyposts(data.data));
    }

    fetchMyPosts();
  }, []);

  const { status } = useSelector((state) => state.authSlice);
  if (!status) {
    return (
      <div className="text-center text-lg font-semibold">
        <h1> 403 | Your must have login to visit this page </h1>
      </div>
    );
  }
  if (allMyPosts.length === 0) {
    return (
      <div className="text-2xl font-semibold text-center m-3 flex gap-3 flex-col">
        <h1>You Posted nothing</h1>{" "}
        <p>
          Start with your{" "}
          <Link to={"/create-post"} className="font-medium underline">
            First Post.
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold  text-center m-3">Your Posts </h1>
      <div className="flex w-[90%] flex-wrap mx-auto flex-grow-0 items-center gap-3 justify-center">
        {allMyPosts &&
          allMyPosts.map((posts, index) => <PostCard {...posts} key={index} />)}
      </div>
    </div>
  );
}

export default YourPosts;
