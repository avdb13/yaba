import Link from "next/link";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "./hooks";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users.all);
  const user = useSelector((state) => state.users.me);

  const linkStyle =
    "p-2 text-grey-dark border-b-2 text-xs border-white mx-4 hover:scale-110 hover:border-indigo-500 transition";

  return (
    <main className="font-semibold text-gray-700">
      <div className="uppercase font-bold px-1 shadow-md flex -mb-px">
        <Link href="/" className={linkStyle}>
          home
        </Link>
        <Link href="/blogs" className={linkStyle}>
          blogs
        </Link>
        <Link href="/users" className={linkStyle}>
          users
        </Link>
        {user ? (
          <a className={linkStyle} onClick={handleLogout}>
            logout {user.name}
          </a>
        ) : (
          <Link href="/login" className={linkStyle}>
            login
          </Link>
        )}
      </div>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold p-4">Welcome to my blog app!</h1>
          }
        />
        <Route path="/blogs" element={blogList()} />
        <Route path="/login" element={loginForm()} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <div className="flex flex-col py-4">
              <Blog
                blog={matchBlog}
                addLike={handleLikeBlog}
                removeBlog={handleRemoveBlog}
              />
            </div>
          }
        />
        <Route path="/users/:id" element={<UserBlogs user={matchUser} />} />
      </Routes>
    </main>
  );
};

export default App;
