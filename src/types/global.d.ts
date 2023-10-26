export {};

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

  interface Comment {
    body: string,
    added: Date,
    author: User | null,
  }

  interface User {
    username: string,
    name: string,
    blogs: Blog[],
  }

  interface Notification {
    type: "error" | "warning" | "message",
    content: string,
  }
}
