import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

function PostsContainer() {
  const url ="https://blogslay-backend.onrender.com"
  // const url = "http://localhost:4000";
  const [allposts, setAllposts] = useState([]);

  useEffect(() => {
    fetch(`${url}/api/v1/user/allposts`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsData) => setAllposts(postsData?.data))
      .then((postsData) => console.log(postsData));
  }, []);

  // if (!allposts.length > 0) {
  //   return (
  //     <div className="flex h-screen w-screen justify-center items-center text-xl font-semibold">
  //       No posts found{" "}
  //     </div>
  //   );
  // }

  return (
    <div className="flex w-[90%] flex-wrap mx-auto flex-grow-0 items-center gap-3 justify-center">
      {allposts &&
        allposts.map((posts, index) => <PostCard {...posts} key={index} />)}
      {/* <h1>this is container</h1> */}
    </div>
  );
}

export default PostsContainer;
