import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { SiteURL, URLList } from "@/utils/const";
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  if (
    !session.data.session &&
    !req.url.startsWith(`${SiteURL}${URLList.front}`)
  )
    return NextResponse.redirect(new URL(URLList.front, req.url));

  if (req.url.split("?")[0] === `${SiteURL}/`)
    return NextResponse.rewrite(new URL(URLList.home, req.url));

  return res;
}

export const config = {
  matcher: ["/", "/news", "/home", "/front"],
};

// export const config = {
//   matcher: "/:path*",
// };
