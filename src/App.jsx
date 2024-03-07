import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  CreatePost,
  EditProfile,
  Home,
  Login,
  NotFound,
  Profile,
  SignUp,
} from "./Pages";
import PostPage from "./Components/Posts-container/PostPage";
import EditPost from "./Pages/EditPost";
import YourPosts from "./Pages/YourPosts";
// import EditPost from "./Pages/EditPost";

function App() {
  return (
    // <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/your-posts" element={<YourPosts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile/:id" element={<EditProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
    // </UserContextProvider>
  );
}

export default App;
