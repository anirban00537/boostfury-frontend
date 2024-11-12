import { NextResponse, type NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // If no token and trying to access protected route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    // Optionally store the attempted URL to redirect back after login
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If has token and trying to access login/signup pages, redirect to dashboard
  if (token && isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Optionally, you can explicitly list your routes
    // '/dashboard/:path*',
    // '/settings/:path*',
    // '/profile/:path*',
  ],
};
