import { ObjectId } from "mongoose";

interface IComment {
  user: ObjectId;
  text: string;
}

interface IPost {
  user: ObjectId;
  text: string;
  photo: string;
  likes: Array<ObjectId>;
  comments: Array<IComment>;
}

export default IPost;
