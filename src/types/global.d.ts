declare global {
  interface Blog {
    id: string,
    title: string,
    url: string,
    likes: number,
    author: string,
    comments: Comment[],
    user: User,
  }

  type BlogForm = Pick<Blog, "title" | "url" | "author">;

  interface Comment {
    id: string,
    body: string,
    added: Date,
    author: User | null,
  }

  interface User {
    username: string,
    name: string,
    blogs: Blog[],
  }

  interface AuthResp {
    username: string,
    name: string,
    token: string,
  }

  interface Notification {
    type: "error" | "warning" | "message",
    content: string,
  }
}

export {};
