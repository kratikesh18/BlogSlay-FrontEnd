import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function PostCard({ title, summary, author, createdAt, coverImage, _id }) {
  return (
    <div className="flex flex-col border-2 border-gray-400  justify-center items-center rounded-md md:flex-row-reverse w-[85%] h-fit p-3 md:justify-between">
      <div className=" h-[15rem] w-full md:w-1/2 border-2 rounded-md border-black/30 overflow-hidden">
        <Link to={`/post/${_id}`}>
          <img
            className="h-full w-full object-cover"
            src={coverImage}
            alt={title}
          />
        </Link>
      </div>

      <div className="flex flex-col h-[80%] md:w-[66%] gap-2  mr-3 pr-2">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold  ">{title}</h2>
        </Link>

        <p className="text-sm font-bold space-x-5">
          <Link>
            <span>{author?.username}</span>
          </Link>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>

        <p className="w-fit text-base font-semibold text-black/90 text-left">
          {summary}
        </p>

        <Link to={`/post/${_id}`}>
          <span>Read more...</span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
