import BlogCard from "./BlogCard";
import BlogForm from "./BlogForm";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold p-4">blogs</h2>
      {user ? <BlogForm /> : null}
      <ul className="flex flex-col">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
