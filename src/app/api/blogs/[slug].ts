import BlogSchema from "../../../models/blog";

export const GET = async ({ params }: { params: { slug: string }}) => {
  const id = params.slug;

  const blog = await BlogSchema.findById(id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments.author", { name: 1 });

  Response.json(blog);
};
