import { Button, Container } from "../utilComponents";
import { format } from "date-fns";

function MyComments({ comment, commentFunc }) {
  return (
    <Container>
      <div className="flex border-4 px-4 py-2 mt-4 gap-4 ">
        <div className=" overflow-hidden h-[8rem] w-[15rem]  ">
          <img
            src={comment?.post?.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 truncate w-[25rem] ">
          <h1 className=" truncate">{comment?.text}</h1>
          <h1>You</h1>
          <time>
            {format(new Date(comment?.createdAt), "MMM d, yyyy HH:mm")}
          </time>
        </div>
        <div>
          <Button
            className={"py-[4px] text-base font-normal bg-red-800"}
            eventFunc={(e) => {
              e.preventDefault();
              commentFunc(comment?._id);
            }}
            text={"delete"}
          />
        </div>
      </div>
    </Container>
  );
}

export default MyComments;
