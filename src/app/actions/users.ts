import { z } from "zod";
import errorHandler from "./errorHandler";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/user";

const userValidator = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/)
    .min(4),
  name: z.string(),
  password: z.string().min(4),
  user: z.string(),
});

export const get = async () => {
  const users = await UserModel.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  Response.json(users);
};

export const post = async (formData: FormData) => {
  const username = formData.get("username");
  const name = formData.get("name");
  const password = formData.get("password");

  try {
    const user = await userValidator.parseAsync({ username, name, password });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();
    Response.json(savedUser, { status: 201 });
  } catch (e) {
    return errorHandler(e);
  }
};
