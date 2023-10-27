import { InferSchemaType, Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  added: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
});

const blogSchema = new Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    type: Types.DocumentArray<InferSchemaType<typeof commentSchema>>,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

blogSchema.set("toJSON", {
  transform: (document, retObject) => {
    retObject.id = retObject._id.toString();
    delete retObject._id;
    delete retObject.__v;
  },
});

commentSchema.set("toJSON", {
  transform: (document, retObject) => {
    retObject.id = retObject._id.toString();
    delete retObject._id;
    delete retObject.__v;
  },
});

export default model("BlogSchema", blogSchema);
