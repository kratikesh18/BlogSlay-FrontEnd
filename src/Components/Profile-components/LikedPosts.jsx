import { Container } from "../utilComponents";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function LikedPosts({ LikedPosts }) {
  return (
    <Container className={"w-full"}>
      <div className="flex mt-4 p-4 gap-3 w-full border-4">
        <div className="overflow-hidden h-[5rem] w-[10rem]">
          <Link to={`/post/${LikedPosts?._id}`}>
            <img
              className="h-full w-full"
              src={LikedPosts?.coverImage}
              loading="lazy"
            />
          </Link>
        </div>
        <div>
          <Link to={`/post/${LikedPosts?._id}`}>
            <h1>{LikedPosts?.title}</h1>
          </Link>
          <h4>{LikedPosts?.author?.username}</h4>
          <div className="flex justify-between relative ">
            <time>
              {format(new Date(LikedPosts?.createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LikedPosts;
