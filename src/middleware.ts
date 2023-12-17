import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { SiteURL } from "@/utils/const";
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  if (!session.data.session && !req.url.startsWith(`${SiteURL}/front`))
    return NextResponse.redirect(new URL("/front", req.url));

  if (req.url === `${SiteURL}/`)
    return NextResponse.redirect(new URL("/home", req.url));

  return res;
}

export const config = {
  matcher: ["/", "/news", "/home", "/front"],
};

// export const config = {
//   matcher: "/:path*",
// };
