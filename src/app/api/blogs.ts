import BlogSchema from "../../models/blog";

export const GET = async () => {
  const blogs = await BlogSchema.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments.author", { name: 1 });

  return Response.json(blogs);
};

export const GET = async () => {
  const blogs = await BlogSchema.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments.author", { name: 1 });

  return Response.json(blogs);
};
