import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/[classId]/:path*",
    "/dashboard/[classId]/discussions/:path*",
    "/dashboard/[classId]/discussions/[messageId]/:path*",
  ],
};
