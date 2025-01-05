import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge'; // Note the /edge import

export async function middleware(req: NextRequest) {
  console.log("middleware");
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return NextResponse.redirect(
      new URL("/api/auth/login?returnTo=/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};


