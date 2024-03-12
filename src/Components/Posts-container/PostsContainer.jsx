import React, { useEffect, useLayoutEffect, useState } from "react";
import PostCard from "./PostCard";

function PostsContainer() {
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL;

  const [allposts, setAllposts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchAllPosts() {
      const response = await fetch(`${url}/api/v1/user/allposts`, {
        method: "GET",
      });

      const postsData = await response.json();
      console.log("Fetched again ");
      setAllposts(postsData.data);

      setLoading(false);
    }

    fetchAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (allposts.length === 0) {
    return <div>No posts found</div>;
  }
  return (
    <div className="flex w-[90%] flex-wrap mx-auto flex-grow-0 items-center gap-3 justify-center">
      {allposts &&
        allposts.map((posts, index) => <PostCard {...posts} key={index} />)}
    </div>
  );
}

export default PostsContainer;

// ***************** GARBAGE CODE **************//

// if (!allposts.length > 0) {
//   return (
//     <div className="flex h-screen w-screen justify-center items-center text-xl font-semibold">
//       No posts found{" "}
//     </div>
//   );
// }
