import { onSuccess, onError } from "./errorHandler";
// import blogService from "../services/blogs";
import { PayloadAction } from "@reduxjs/toolkit";
import { resetUser } from "./usersReducer";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";

type BlogState = Blog[];

const initialState: BlogState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    set(state, action: PayloadAction<Blog[]>) {
      return action.payload;
    },
    append(state, action: PayloadAction<Blog>) {
      return [...state, action.payload];
    },
    update(state, action: PayloadAction<Blog>) {
      return state.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },
    addComment(state, action: PayloadAction<Comment & { id: string }>) {
      const {id, ...comment} = action.payload;
      return state.map((b) =>
        b.id === id ? ({ ...b, comments: [...b.comments, comment] }) : b,
      );
    },
    remove(state, action: PayloadAction<string>) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: {

  }
});

export const initializeBlogs = (): AppThunk => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (blog: Blog): AppThunk => {
  return async (dispatch, getState) => {
    const me = getState().users.me;
    const token = me ? me.token : null;

    try {
      const newBlog = await blogService.create(blog, token);

      dispatch(append(newBlog));
      dispatch(
        onSuccess(`${newBlog.title} by ${newBlog.author} was added`)
      );
    } catch(e) {
      console.log(e);
      dispatch(onError(e.message));
    }
  };
};

export const likeBlog = (id, title) => {
  return async (dispatch, getState) => {
    // in case we want authentication
    // let token = getState().user.token

    const newBlog = await blogService.like(id);
    dispatch(update(newBlog));
    dispatch(onSuccess(`you liked ${title}`));
  };
};

export const commentBlog = (id, body) => {
  return async (dispatch, getState) => {
    const token = getState().users.me ? getState().users.me.token : null;

    try {
      const comment = await blogService.comment(id, body, token);
      dispatch(addComment({ comment, id }));
    } catch(e) {
      console.log(e);
      dispatch(onError("please login again"));
      resetUser();
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    try {
      await blogService.remove(id, token);
      dispatch(remove(id));
    } catch(e) {
      dispatch(onError("you can only delete your own blogs"));
    }
  };
};

const { set, append, addComment, update, remove } = blogSlice.actions;
export default blogSlice.reducer;
