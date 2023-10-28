import blogActions from "../app/actions/blogs";

const BlogForm = () => {
  const blogStyle = "mx-4 bg-white mb-4 ";
  const inputStyle =
    "bg-gray-200 rounded focus:outline-none focus:-border-1 bg-slate-100 text-center";
  const labelStyle = "block w-24";
  const fieldStyle = "flex flex-row";

  return (
    <form action={blogActions.create} id="blogForm" className={blogStyle}>
      <div className="flex flex-col gap-2">
        <div className={fieldStyle}>
          <label className={labelStyle}>title </label>
          <input
            type="title"
            id="title"
            className={inputStyle}
            name="Title"
          />
        </div>
        <div className={fieldStyle}>
          <label className={labelStyle}>URL </label>
          <input
            type="url"
            id="url"
            className={inputStyle}
            name="Url"
          />
        </div>
        <div className={fieldStyle}>
          <label className={labelStyle}>author </label>
          <input
            type="author"
            id="author"
            className={inputStyle}
            name="Author"
          />
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
