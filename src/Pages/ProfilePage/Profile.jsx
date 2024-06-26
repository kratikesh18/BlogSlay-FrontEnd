import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import Button from "../../Components/utilComponents/Button";

import { LikedPosts, MyComments } from "../../Components";

function Profile() {
  // const url = "https://blogslay-backend.onrender.com";
  const url = import.meta.env.VITE_BACKEND_URL;

  const { status, userdata } = useSelector((state) => state.authSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});

  const [showComments, setShowComments] = useState(false);

  const [likedPosts, setLikedPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);

  const handleLogout = async (e) => {
    e.preventDefault();
    //here we just have to invalidate the cookie
    setLoading(false);
    try {
      const res = await fetch(`${url}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        dispatch(logout());
        console.log("navigating to login");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/api/v1/user/userprofile`, {
          method: "GET",
          credentials: "include",
        });
        const resData = await response.json();
        setProfileData(resData?.data);
      } catch (error) {
        console.log("Error while fetching the post ");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    handleShowLikedPosts();
  }, []);

  const handleShowLikedPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/user/likedposts`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const { data } = await response.json();
        // console.log(data);
        setLikedPosts(await data);
        // console.log( await likedPosts);
      }
    } catch (error) {
      console.log("error while fetching liked posts", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/user/usercomments`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setMyComments(await data.data);
        console.log(myComments);
      }
    } catch (error) {
      console.log("error while fetching comments ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);
    console.log("Deleting the comment");
    try {
      const response = await fetch(`${url}/api/v1/user/deletecomment`, {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        handleShowComments();
      }
    } catch (error) {
      console.log("Error while deleting comment");
    } finally {
      setLoading(false);
    }
  };

  const renderComments = () => {
    if (myComments.length == 0)
      return (
        <div className=" text-xl font-semibold text-center">
          <h1>NO Comments !</h1>{" "}
          <p>Go Comment on posts to see something here</p>
        </div>
      );
    return myComments.map((eachComment, index) => (
      <MyComments
        comment={eachComment}
        commentFunc={deleteComment}
        key={index}
      />
    ));
  };

  const renderLikedPosts = () => {
    if (likedPosts.length == 0)
      return (
        <div className=" text-xl font-semibold text-center">
          <h1>No Liked Posts Found 🫤..!</h1>
          <p>seems like you dont like liking posts.</p>
        </div>
      );
    return likedPosts.map((post, index) => (
      <LikedPosts LikedPosts={post} key={index} />
    ));
  };

  if (!status) {
    return (
      <div className="text-center text-lg font-semibold">
        <h1> 403 | Your must have login to visit this page </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="flex w-[95%] mx-auto mt-4 items-center flex-col ">
      {/* for the images */}
      <div className="border-4 relative border-black w-[95%] flex justify-center h-fit flex-col items-center ">
        <div className="w-full h-[22rem]">
          <img
            className="w-full h-full object-cover "
            src={profileData?.profileCoverImage}
            loading="lazy"
          />
        </div>

        <div className="md:w-[35%] lg:w-fit h-52  top-[12rem] absolute overflow-hidden border-4 rounded-lg">
          <img
            src={profileData?.profileAvatar}
            className="w-full h-full scale-110 object-cover object-center  "
            loading="lazy"
          />
        </div>
      </div>

      {/* for the profile data and logout editprofile button */}
      <div className="flex justify-center items-center flex-col mt-[5rem]  ">
        <h1 className="text-2xl font-bold ">
          Hello, <span>{profileData?.username}</span>
        </h1>
        <h2 className="text-xl">{profileData?.email}</h2>
        <div className="flex gap-4 my-4">
          <Link to={`/editprofile/${userdata?._id}`}>
            <Button text={"Edit Profile"} />
          </Link>
          <Button text={"Logout"} eventFunc={handleLogout} />
          <Link to={`/changepassword`}>
            <Button text={"Change Password"} />
          </Link>
        </div>
      </div>

      {/* for the comment and like buttons */}
      <div className="w-full ">
        <div className="flex gap-7 w-full justify-center items-center h-[3rem] border py-1 border-gray-500/60 border-x-0 rounded-lg">
          <button
            onClick={() => {
              setShowComments(false);
              handleShowLikedPosts();
            }}
            className="text-xl px-3 bg-gray-300  rounded-lg h-full hover:bg-gray-200 focus:bg-gray-400 focus:font-semibold "
          >
            Likes
          </button>
          <button
            onClick={() => {
              setShowComments(true);
              handleShowComments();
            }}
            className="text-xl px-3 bg-gray-300 rounded-lg h-full hover:bg-gray-200 focus:bg-gray-400 focus:font-semibold "
          >
            Comments
          </button>
        </div>
      </div>

      {/* for the like and comment section */}
      <div className="mt-3 min-h-[10rem] flex flex-col justify-center items-center  w-full h-full rounded-md">
        {showComments ? renderComments() : renderLikedPosts()}
      </div>
    </div>
  );
}

export default Profile;

// trash code but works fine
{
  /* {showComments
  ? myComments &&
    myComments.map((eachComment, index) => (
      <MyComments
        comment={eachComment}
        commentFunc={deleteComment}
        key={index}
      />
    ))

  : likedPosts &&
    likedPosts.map((post, index) => (
      <LikedPosts LikedPosts={post} key={index} />
    ))} */
}
