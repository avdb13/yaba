import { z } from "zod";
import { BlogModel } from "../../models/blog";
import errorHandler from "./errorHandler";

("use server");

const blogValidator = z.object({
  title: z.string(),
  author: z.string(),
  url: z.string().url(),
  user: z.string(),
});

const commentValidator = z.object({
  body: z.string(),
  author: z.string(),
  user: z.string().optional(),
});

const get = async (id: string) => {
  const blog = await BlogModel.findById(id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments.author", { name: 1 });

  Response.json(blog);
};

const getAll = async () => {
  const blogs = await BlogModel.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments.author", { name: 1 });

  Response.json(blogs);
};

const create = async (formData: FormData) => {
  const title = formData.get("title");
  const url = formData.get("url");
  const author = formData.get("author");

  try {
    const blog = await blogValidator.parseAsync({ title, url, author });
    const newBlog = new BlogModel(blog);

    const user = await UserModel.findById(req.user);
    const savedBlog = await newBlog.save();

    user.blogs = [...user.blogs, savedBlog];
    await user.save();

    Response.json(savedBlog, { status: 201 });
  } catch (e) {
    return errorHandler(e);
  }

  // if (!req.user) {
  //   resp.status(401).json({ error: "missing bearer token" });
  //   return;
  // }
};

const comment = async (formData: FormData, id: string) => {
  const body = formData.get("body");
  // const author = formData.get("author");

  try {
    const author = req.user ? req.user : null;
    const comment = await commentValidator.parseAsync({ body, author });

    // const comment = { body, added: new Date(), author };

    const { comments } = await BlogSchema.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      {
        runValidators: true,
        new: true,
        context: "query",
      },
    ).populate("comments.author", {
      name: 1,
    });
    Response.json(comments[comments.length - 1], { status: 201 });
  } catch (e) {
    return errorHandler(e);
  }
};

export default { get, getAll, create, comment };
