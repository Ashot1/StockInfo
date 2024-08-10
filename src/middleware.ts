import { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(req: NextRequest) {
   //
   // if (
   //    error &&
   //    !req.url.startsWith(`${process.env.NEXT_PUBLIC_SITEURL}${URLList.front}`)
   // )
   //    return NextResponse.redirect(new URL(URLList.front, req.url))
   //
   // if (
   //    req.url.split('?')[0] === `${process.env.NEXT_PUBLIC_SITEURL}/` ||
   //    req.url.split('?')[0] === `${process.env.NEXT_PUBLIC_SITEURL}`
   // )
   // return NextResponse.rewrite(new URL(URLList.home, req.url))

   return await updateSession(req)
}

export const config = {
   matcher: [
      '/((?!_next/static|_next/image|__nextjs_original-stack-frame|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|json)$).*)',
   ],
}
