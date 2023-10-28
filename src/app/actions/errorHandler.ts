import { ZodError } from "zod";

const errorHandler = (e: unknown) => {
  if (e instanceof ZodError) {
    // only first error matters, if the user fixes it and resubmits
    // the form he can find out for himself what else is wrong
    const error = `${e.issues[0].path}: ${e.issues[0].message}`;
    return Response.json({ error }, { status: 401 });
  } else if (e instanceof Error) {
    const error = e.message;
    return Response.json({ error }, { status: 401 });
  } else {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

export default errorHandler;
