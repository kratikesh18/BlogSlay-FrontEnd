import React, { useEffect } from "react";

import PostsContainer from "../Components/Posts-container/PostsContainer.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const status = useSelector((state) => state.authSlice.status);

  useEffect(() => {
    
  }, [PostsContainer]);

  
  if (!status) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <h1 className="text-2xl font-semibold">
          Explore our Blogs <br /> By just{" "}
          <Link to={"/login"}>
            <span className="underline">Clickin here</span>
          </Link>
        </h1>
      </div>
    );
  }
  return <PostsContainer />;
}

export default Home;
