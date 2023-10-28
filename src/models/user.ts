import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  username: {
    type: String,
    match: /[a-zA-Z0-9]{3,}/,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set("toJSON", {
  transform: (document, retObject) => {
    retObject.id = retObject._id.toString();
    delete retObject._id;
    delete retObject.__v;
    delete retObject.passwordHash;
  },
});

export const UserModel = model("User", userSchema);
